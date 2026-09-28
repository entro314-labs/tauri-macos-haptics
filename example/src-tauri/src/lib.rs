pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_macos_haptics::init())
        .plugin(tauri_plugin_shell::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
