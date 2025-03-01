```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
  
    // match /{document=**} {
    //   allow read, write: if false;
    // }
    
    match /users/{userId}/{document=**} {
    	allow read: if true;
    }
    
    // Restrict Write Access to the User's own data
    match /users/{userId}/{document=**} {
        allow write: if request.auth.uid == userId;
    }
    
    match /bookings/{bookingId}/{document=**} {
    	allow read, write: if true;
    }
    
    // match /bookings/{bookingId}/{document=**} {
    // 	allow write: if request.auth.uid != null;
    // }
    
  }
}
```