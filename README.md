# Finura Agro Tech LLP Website

A modern, animated website for Finura Agro Tech LLP showcasing their organic farming and biotechnology services, products, and opportunities.

## Features

- 🎨 **Modern Design** - Unique agricultural-themed color palette
- ✨ **Advanced Animations** - Scroll animations, parallax effects, 3D card interactions
- 📱 **Fully Responsive** - Works seamlessly on all devices
- 🔔 **Contact Form** - EmailJS integration for sending emails
- 🌱 **Smooth User Experience** - Smooth scrolling, loading animations, and interactive elements

## Pages

1. **Home** (`index.html`) - Hero section with animated text, stats counter, services showcase
2. **About** (`about.html`) - Company story, mission, vision, values, and facilities
3. **Products** (`products.html`) - Product catalog with filtering functionality
4. **Internships** (`internships.html`) - Available internship positions and application process
5. **Accreditations** (`accreditations.html`) - Certifications and quality standards
6. **Contact** (`contact.html`) - Contact form and information

## EmailJS Setup Instructions

The contact form is configured to send emails to `ashikimman007@gmail.com`. To enable email functionality:

### Option 1: Using EmailJS (Recommended)

1. **Create an EmailJS account**:
   - Go to [https://www.emailjs.com/](https://www.emailjs.com/)
   - Sign up for a free account (100 emails/month free)

2. **Create an Email Service**:
   - Go to "Email Services" in your dashboard
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the setup instructions

3. **Create an Email Template**:
   - Go to "Email Templates"
   - Click "Create New Template"
   - Use this template structure:
     ```
     Subject: {{subject}}
     
     From: {{from_name}} ({{from_email}})
     Phone: {{phone}}
     
     Message:
     {{message}}
     ```

4. **Get your credentials**:
   - Public Key: Found in "Account" > "General"
   - Service ID: From your email service
   - Template ID: From your email template

5. **Update script.js**:
   - Open `script.js`
   - Find these lines at the top:
     ```javascript
     const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
     const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
     const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
     ```
   - Replace with your actual values

6. **Uncomment EmailJS code**:
   - In `script.js`, find the contact form handler
   - Uncomment the EmailJS section (lines starting with `emailjs.send`)
   - Comment out or remove the mailto fallback section

### Option 2: Using mailto (Temporary)

Currently, the form uses a `mailto:` link as a fallback. This opens the user's email client with a pre-filled message. To make this work better:

- The form will open the default email client
- The user needs to manually send the email

## Customization

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-green: #2d5016;
    --secondary-green: #4a7c2a;
    --accent-green: #a8d574;
    /* ... */
}
```

### Contact Email
To change the recipient email:
1. Update `script.js` - change `to_email: 'ashikimman007@gmail.com'`
2. Update EmailJS template to send to the new email

### Content
- Edit HTML files directly to update text content
- All images are currently placeholders (emoji icons)
- Replace with actual images as needed

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Animations

The website includes:
- **Scroll Animations**: Elements fade in as you scroll
- **Parallax Effects**: Background elements move at different speeds
- **3D Card Interactions**: Cards tilt and transform on hover
- **Counter Animations**: Statistics count up when viewed
- **Floating Elements**: Animated background leaves
- **Smooth Transitions**: All interactions are smooth and polished

## Development

Simply open `index.html` in a web browser to view the website locally. No build process required.

For production:
1. Update all placeholder content
2. Add real images
3. Configure EmailJS
4. Update contact information
5. Test all forms and links

## License

© 2025 Finura Agro Tech LLP. All rights reserved.
