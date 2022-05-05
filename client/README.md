# Segmentation Analysis for Shopify Ecosystem

To run the application

Step 1: Clone the repository and create a .env file with the required information according to the .env.example file.

Step 2: Install yarn and run command 

    yarn install 
to install the required packages.

Step 3: Create a ngrok URL at the port 8081 in the localhost.

Step 4: Copy paste the https URL into the .env file and also the appplication of Shopify app. Also whitelist the ngrok URL with /callback/auth

    eg:
    ngrok URL is: https://d7ae-117-195-21-137.ngrok.io/
    Whitelist: https://d7ae-117-195-21-137.ngrok.io/callback/auth
    
Step 5: Run the application using the command

    yarn run dev
    
Step 6: Install the application using shopify store.
