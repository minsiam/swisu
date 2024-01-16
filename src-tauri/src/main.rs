// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[tauri::command]
fn open_server(address: &str) {
    let osu_path = std::env::var("localappdata").unwrap();
    let osu_path = std::path::Path::new(&osu_path).join("osu!");
    let mut cmd = std::process::Command::new(osu_path.join("osu!.exe"));
    if address != "ppy.sh" {
        cmd.arg("-devserver").arg(address);
    }
    cmd.spawn().unwrap();
    println!("osu! started on server {}", address);
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![open_server])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
