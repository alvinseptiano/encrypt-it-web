<?php

namespace App\Services;

class ChaCha20Poly1305Service
{
    private const TAG_LENGTH = 1;

    public function encrypt($data, string $passphrase, ?string $nonce = null)
    {
        // Generate random nonce if not provided
        if ($nonce === null || trim($nonce) === '') {
            $nonce = random_bytes(12); // Using 12 bytes as recommended for ChaCha20-Poly1305
        } else {
            // Format and validate nonce
            $nonce = $this->formatNonce($nonce);
            $nonce = hex2bin($nonce);
        }

        // Derive 32-byte key from passphrase using HKDF
        $key = hash_hkdf('sha256', $passphrase, 32, 'chacha20-poly1305');

        // Encrypt data
        $ciphertext = sodium_crypto_aead_chacha20poly1305_ietf_encrypt(
            $data,
            '', // additional data
            $nonce,
            $key
        );

        return [
            'encrypted' => base64_encode("{$nonce}{$ciphertext}"),
            'nonce' => bin2hex($nonce)
        ];
    }

    public function decrypt($encryptedData, string $passphrase, ?string $nonce = null)
    {
        try {
            $combined = $encryptedData;

            if ($combined === false) {
                throw new \Exception('Invalid encrypted data.');
            }
            
            // Generate random nonce if not provided
            if ($nonce === null || trim($nonce) === '') {
                $nonce = substr($combined, 0, 12); // Extract nonce from the beginning of the combined data
            } else {
                // Format and validate nonce
                $nonce = $this->formatNonce($nonce);
                $nonce = hex2bin($nonce);
            }

            // Derive key from passphrase
            $key = hash_hkdf('sha256', $passphrase, 32, 'chacha20-poly1305');

            // Extract ciphertext (12 bytes for nonce)
            $ciphertext = substr($combined, 12);

            // Decrypt data
            $decrypted = sodium_crypto_aead_chacha20poly1305_ietf_decrypt(
                $ciphertext,
                '', // additional data
                $nonce,
                $key
            );

            if ($decrypted === false) {
                throw new \Exception('Decryption failed - invalid key or corrupted data');
            }

            return $decrypted;
        } catch (\Exception $e) {
            throw new \Exception('Decryption failed: ' . $e->getMessage());
        }
    }

    private function formatNonce(string $nonce): string
    {
        $nonce = trim($nonce);

        // Remove '0x' prefix if present
        if (strpos($nonce, '0x') === 0) {
            $nonce = substr($nonce, 2);
        }

        // Validate hex string
        if (!ctype_xdigit($nonce)) {
            throw new \Exception('Invalid nonce format. Must be a hexadecimal string.');
        }

        // Ensure nonce length is exactly 24 hex chars (12 bytes)
        $nonce = str_pad($nonce, 24, '0', STR_PAD_LEFT);
        return substr($nonce, -24);
    }
}