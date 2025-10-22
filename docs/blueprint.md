# **App Name**: StyleSwap

## Core Features:

- Home/Menu Screen: Display two options: 'Change Outfit/Cloth Color' and 'Change Entire Outfit/Cloth', navigating to the respective editing screens upon selection.
- Change Outfit/Cloth Color: Allow users to upload an image, select a color, and generate a modified image via nanobanana.ai API.  Also shows a download button when the modification is completed.
- Change Entire Outfit/Cloth: Enable users to upload two images (person and outfit), generate a combined image using nanobanana.ai API, and download the result.
- AI Integration: API route to handle image processing requests via nanobanana.ai, managing modes, images, and color parameters.
- User Authentication: Implement Google Sign-In with Firebase Authentication.
- Data Storage: Store uploaded photos and processed outputs in Firebase Storage, with user edit history logged in Firebase Firestore including user ID, mode, file URLs, and timestamps.

## Style Guidelines:

- Primary color: Soft blue (#A0D2EB) to create a calming, reliable aesthetic.
- Background color: Light gray (#F5F5F5) for a clean and modern interface.
- Accent color: Muted purple (#C7B9FF) for interactive elements, providing a gentle contrast.
- Body text: 'PT Sans', sans-serif.
- Headline text: 'Space Grotesk', sans-serif. If longer text is anticipated, use 'Space Grotesk' for headlines and 'Inter' for body
- Use simple, minimalist icons to represent different features and actions.
- Incorporate smooth transitions and hover effects for an engaging user experience.