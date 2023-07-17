#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]

use std::io::{Read, Write};
use bcrypt::{hash, verify};
use serde::{Deserialize, Serialize};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
// #[tauri::command]
// fn greet(name: &str) -> String {
//     format!("Hello, {}! You've been greeted from Rust!", name)
// }

static ENC_PASSWD_PATH: &str = ".encrypted-passwd.txt";


#[tauri::command(rename_all = "snake_case")]
fn create_encrypted_file(password: String) {
    let encrypted_passwd = hash(password, 20).unwrap();
    let mut f = std::fs::File::create(ENC_PASSWD_PATH).unwrap();
    f.write(encrypted_passwd.as_bytes()).unwrap();
    println!("Encrypted file created!");
}

#[tauri::command(rename_all = "snake_case")]
fn test_file_exists() -> bool {
    std::path::Path::new(ENC_PASSWD_PATH).exists()
}

#[tauri::command(rename_all = "snake_case")]
fn check_passwd(password: String) -> bool {
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
    res.push(("2023-07-15".to_string(),
              DiaryEntry("2023-07-15".to_string(), "What a nice girl!".to_string())));
    res
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            test_file_exists,
            create_encrypted_file,
            check_passwd,
            get_entries
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
