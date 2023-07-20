#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use bcrypt::{hash, verify};
use magic_crypt::{new_magic_crypt, MagicCryptTrait};
use rusqlite::Connection;
use serde::{Deserialize, Serialize};
use std::fs;
use std::io::{Read, Write};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

static ENC_PASSWD_PATH: &str = ".encrypted-passwd.txt";
static DIARY_PATH: &str = ".my-diary";
static DB_NAME: &str = "diary.db";

#[tauri::command(rename_all = "snake_case")]
fn create_encrypted_file(password: String) {
    let encrypted_passwd = hash(password, 12).unwrap();
    let diary_path = home::home_dir().unwrap().join(DIARY_PATH);
    if !diary_path.exists() {
        fs::create_dir(diary_path.clone()).unwrap();
    }
    let mut f = fs::File::create(diary_path.join(ENC_PASSWD_PATH)).unwrap();
    f.write(encrypted_passwd.as_bytes()).unwrap();
    println!("Encrypted file created!");
}

#[tauri::command(rename_all = "snake_case")]
fn test_file_exists() -> bool {
    home::home_dir()
        .unwrap()
        .join(DIARY_PATH)
        .join(ENC_PASSWD_PATH)
        .exists()
}

#[tauri::command(rename_all = "snake_case")]
fn check_passwd(password: &str) -> bool {
    let mut f = fs::File::open(
        home::home_dir()
            .unwrap()
            .join(DIARY_PATH)
            .join(ENC_PASSWD_PATH),
    )
    .unwrap();
    let mut saved_passwd = String::new();
    f.read_to_string(&mut saved_passwd).unwrap();
    verify(password, &saved_passwd).unwrap()
}

#[derive(Serialize, Deserialize)]
struct DiaryEntry(String, String);

type IndexDate = String;

#[tauri::command]
fn get_entries(passwd: &str) -> Vec<(IndexDate, DiaryEntry)> {
    let diary_path = home::home_dir().unwrap().join(DIARY_PATH);
    if !diary_path.join(DB_NAME).exists() {
        return vec![];
    }
    let conn = Connection::open(diary_path.join(DB_NAME)).expect("Error opening database");
    let mut stmt = conn
        .prepare("SELECT * FROM diary")
        .expect("Statement error");
    let mc = new_magic_crypt!(passwd, 256);
    let res = stmt
        .query_map([], |row| Ok((row.get(0), row.get(1), row.get(2))))
        .unwrap()
        .map(|res| {
            let r = res.unwrap();
            let encrypted_content: String = r.2.unwrap();
            let content = mc.decrypt_base64_to_string(encrypted_content).unwrap();
            (r.0.unwrap(), DiaryEntry(r.1.unwrap(), content))
        })
        .collect();
    res
}

#[tauri::command(rename_all = "snake_case")]
fn save_file(index_date: &str, content: &str, passwd: &str) {
    let diary_path = home::home_dir().unwrap().join(DIARY_PATH);
    let conn = Connection::open(diary_path.join(DB_NAME)).expect("Error opening database");
    conn.execute(
        "create table if not exists diary (
            index_date text primary key,
            mtime text not null,
            content text not null
        )",
        [],
    )
    .unwrap();

    if content.is_empty() {
        conn.execute(
            "DELETE FROM diary where index_date=?1",
            [index_date.to_string()],
        )
        .unwrap();
        return;
    }
    let mc = new_magic_crypt!(passwd, 256);
    let encrypted_content = mc.encrypt_bytes_to_base64(content);
    conn.execute(
        "REPLACE INTO diary VALUES (?1, datetime('now'), ?2)",
        [index_date.to_string(), encrypted_content],
    )
    .unwrap();
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            test_file_exists,
            create_encrypted_file,
            check_passwd,
            get_entries,
            save_file
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
