#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]

use std::fs;
use std::io::{Read, Write};
use std::path::Path;
use bcrypt::{hash, verify};
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

static ENC_PASSWD_PATH: &str = ".encrypted-passwd.txt";
static DIARY_PATH: &str = ".diary";

#[tauri::command(rename_all = "snake_case")]
fn create_encrypted_file(password: String) {
    let encrypted_passwd = hash(password, 20).unwrap();
    let mut f = std::fs::File::create(ENC_PASSWD_PATH).unwrap();
    f.write(encrypted_passwd.as_bytes()).unwrap();
    println!("Encrypted file created!");
}

#[tauri::command(rename_all = "snake_case")]
fn test_file_exists() -> bool {
    Path::new(ENC_PASSWD_PATH).exists()
}

#[tauri::command(rename_all = "snake_case")]
fn check_passwd(password: &str) -> bool {
    let mut f = std::fs::File::open(ENC_PASSWD_PATH).unwrap();
    let mut saved_passwd = String::new();
    f.read_to_string(&mut saved_passwd).unwrap();
    verify(password, &saved_passwd).unwrap()
}

#[derive(Serialize, Deserialize)]
struct DiaryEntry(String, String);

type IndexDate = String;

#[tauri::command]
fn get_entries() -> Vec<(IndexDate, DiaryEntry)> {

    let mut res = vec![];
    let diary_path = Path::new(DIARY_PATH);
    let paths = fs::read_dir(diary_path).unwrap();
    for path in paths {
        let path = path.unwrap().path();
        let index_date = path.file_name().unwrap().to_str().unwrap()[..10].to_string();
        let meta = fs::metadata(path.clone()).unwrap();
        let mtime = if let Ok(tm) = meta.modified() {
            let date_time: DateTime<Utc> = tm.into();
             date_time.format("%Y-%m-%d %T").to_string()
        } else {
            "".to_string()
        };
        let mut content = String::new();
        fs::File::open(path.clone()).unwrap().read_to_string(&mut content).unwrap();
        res.push((
            index_date,
            DiaryEntry(mtime, content)
        ));
    }
    res
}

#[tauri::command(rename_all = "snake_case")]
fn save_file(index_date: &str, content: &str) {
    let diary_path = Path::new(DIARY_PATH);
    if !diary_path.exists() {
        fs::create_dir(diary_path).unwrap();
    }
    let file_path = diary_path.join(format!("{}.txt", index_date));
    if content.is_empty() && file_path.exists() {
        fs::remove_file(file_path).unwrap();
        return;
    }
    let mut file = std::fs::File::create(file_path).unwrap();
    file.write(content.as_bytes()).unwrap();
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
