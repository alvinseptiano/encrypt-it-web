<h1 align="center">Encrypt It</h1>

## Tentang Encrypt It

Adalah aplikasi kriptografi berbasis web menggunakan algoritma [ChaCha20-Poly1305](https://tools.ietf.org/html/rfc8439), dengan fitur seperti:

- Enkripsi dan dekripsi file.
- File storage.
- Hex table.


## How to start
1. Install dependencies `composer install` & `npm install`
2. Lakukan migrasi database `php artisan migrate`
3. Jalankan server `composer run dev`

Note: Jika ada masalah upload pastikan ukuran file tidak melebihi [upload_max_filesize](https://www.php.net/manual/en/ini.core.php#ini.upload-max-filesize) yang ada di `php.ini` 

## Dependencies
- Laravel v11.0
- Vue v3.4.0
- DaisyUI v5.0
- Talwind v4.0

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
