## Build a basic version of PayTM

This is a simple imitation of the paytm app. There is no banking api's used.

##Signup Page
Here the details of the user is taken and then its cross checked in the db to check whether a user is already in the db and after confirming the user is allowed to sign up. Here there is input validation in both the frontend and the backend.<img width="1364" alt="Screenshot 2024-01-26 at 8 21 52 PM" src="https://github.com/ruhneb2004/Paytm-App-Project/assets/146971477/7f85aa06-b6d0-48bf-b2c5-df371507b7a9">
<img width="1680" alt="Screenshot 2024-01-26 at 8 23 50 PM" src="https://github.com/ruhneb2004/Paytm-App-Project/assets/146971477/d3dfadc0-88c3-4cd2-8126-6bcbd6d2d2cd">
<img width="1680" alt="Screenshot 2024-01-26 at 8 24 09 PM" src="https://github.com/ruhneb2004/Paytm-App-Project/assets/146971477/19534e91-59a2-4943-b9c7-240451c1b555">
<img width="1680" alt="Screenshot 2024-01-26 at 8 30 53 PM" src="https://github.com/ruhneb2004/Paytm-App-Project/assets/146971477/f4a15968-bf55-4938-b37e-076c633d8977">


##Signin Page
This page checks whether user is valid or not and then allows the user to enter into the dashboard. The user on successful login will recieve a token and this will be used in the other part of the app to authorize the user. Here also the input validation checks are present.<img width="1680" alt="Screenshot 2024-01-26 at 8 28 17 PM" src="https://github.com/ruhneb2004/Paytm-App-Project/assets/146971477/7e6b3e53-a0e2-418d-a264-f2fe28896f4c">


<img width="1680" alt="Screenshot 2024-01-26 at 8 28 17 PM" src="https://github.com/ruhneb2004/Paytm-App-Project/assets/146971477/9cb9b97a-01de-474d-aaa4-91d06cf781fa">
<img width="1680" alt="Screenshot 2024-01-26 at 8 28 09 PM" src="https://github.com/ruhneb2004/Paytm-App-Project/assets/146971477/eda8bf27-73da-4550-9d56-1b41d4b38a47">

##Dashboard

This is the main page where the functionality lies. Here some random amount of money is given to each user on login and they can transfer the money to others users previously logined to the app. The transaction is secure as it ensures the transaction to be completely finished or completely cancelled. This ensures no halfway transactions. This is implemented by the session usage in mongoose. The users can also search for other users though the search bar. The searches don't have to be complete for the user to filter through the names, it will match the user with the given words and filter out the rest based on that. The user can send money to the other user by clicking on the send money button. A modal will open up and the user can send money through that. After payment the balance will be updated in the realtime and the other user will successfully recieve the money and at the same time money will be debited from the user.
<img width="1680" alt="Screenshot 2024-01-26 at 8 37 15 PM" src="https://github.com/ruhneb2004/Paytm-App-Project/assets/146971477/7db64bc5-d0ab-42d5-9b39-fca0f9a3ef6b">
<img width="1680" alt="Screenshot 2024-01-26 at 8 39 16 PM" src="https://github.com/ruhneb2004/Paytm-App-Project/assets/146971477/c0bc7e59-17b5-4b98-b911-a07a85b45eda">
<img width="1680" alt="Screenshot 2024-01-26 at 8 41 13 PM" src="https://github.com/ruhneb2004/Paytm-App-Project/assets/146971477/57d40c0c-458e-4e3f-b4f6-7b2ff9f2a964">

<img width="1680" alt="Screenshot 2024-01-26 at 8 41 25 PM" src="https://github.com/ruhneb2004/Paytm-App-Project/assets/146971477/5e6892a0-d830-43d0-97b3-c54207f2bd0f">

That's all if you sticked through till the end thanks, I appreciate it :)






