


## Generate Your JWT Keys

To use JWT with the `RS256` algorithm in this project, you need to set the `JWT_PRIVATE_KEY` and `JWT_PUBLIC_KEY` in your `.env` file. Below are the steps to generate and configure your keys.

#### 1. Generate the Private Key

Run the following command to generate a 2048-bit RSA private key:

```bash
openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048
```


#### 2. Generate the Public Key

Next, extract the public key from the private key:

```bash
openssl rsa -pubout -in private_key.pem -out public_key.pem
```

#### 3. Convert Keys to Base64

For easier usage in your `.env` file, you'll need to convert the keys to base64 format.

Convert the private key to base64:

```bash
base64 private_key.pem > private_key_base64.txt
```


#### 4. Add Keys to the `.env` File

Once you have the base64-encoded versions of your keys, open the `private_key_base64.txt` and `public_key_base64.txt` files, and copy the contents into your `.env` file as follows:

```env
JWT_PRIVATE_KEY="your_base64_encoded_private_key"
JWT_PUBLIC_KEY="your_base64_encoded_public_key"
```

That's it! 🚀 Now your application is ready to use them for signing and verifying tokens.
