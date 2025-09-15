# WhatsApp Integration Setup Guide

This guide will help you set up branch-specific WhatsApp notifications for the La Coiffure Salon booking system.

## 🚀 Features Implemented

- **Branch-Specific Notifications**: Different WhatsApp numbers for Powai and Thane branches
- **Automatic Notifications**: Sent when a booking is made
- **Client Confirmation**: Automatic confirmation message to clients
- **Admin Test Interface**: Test WhatsApp messages from admin panel
- **Branch Filtering**: Filter appointments by branch in admin panel

## 📱 WhatsApp Numbers Configured

- **Powai Branch**: +917400068615
- **Thane Branch**: +919967002481

## 🔧 Setup Instructions

### 1. WhatsApp Business API Setup

1. **Create a Meta Developer Account**
   - Go to [developers.facebook.com](https://developers.facebook.com)
   - Create a new app and select "Business" type
   - Add WhatsApp Business API product

2. **Get Your Credentials**
   - Access Token: From your app's WhatsApp Business API settings
   - Phone Number ID: From your WhatsApp Business phone number

3. **Set Environment Variables**
   Create a `.env` file in the project root:
   ```env
   WHATSAPP_ACCESS_TOKEN=your_actual_access_token
   WHATSAPP_PHONE_NUMBER_ID=your_actual_phone_number_id
   ```

### 2. Update Branch Numbers

In `server.js`, update the `BRANCH_NUMBERS` object with your actual WhatsApp Business numbers:

```javascript
BRANCH_NUMBERS: {
  powai: '+917400068615', // Your Powai WhatsApp Business number
  thane: '+919967002481'  // Your Thane WhatsApp Business number
}
```

### 3. Test the Integration

1. **Start the server**:
   ```bash
   npm run server
   ```

2. **Test from Admin Panel**:
   - Go to Admin Panel → WhatsApp Test
   - Enter a test phone number
   - Select branch and send test message

3. **Test Booking Flow**:
   - Make a booking through the website
   - Check if WhatsApp notifications are sent to the appropriate branch

## 📋 Message Templates

### Branch Notification Message
```
🎉 *New Booking Alert - POWAI Branch*

👤 *Client Details:*
• Name: John Doe
• Phone: +919876543210
• Booking Type: appointment

📅 *Appointment Details:*
• Date: Monday, January 15, 2024
• Time: 10:00 AM
• Branch: Powai (Galleria)

📱 *Contact Client:* +919876543210

Please confirm this appointment with the client.

---
La Coiffure Salon - POWAI Branch
```

### Client Confirmation Message
```
Thank you for booking with La Coiffure Salon!

Your appointment is confirmed:
📅 Date: Monday, January 15, 2024
⏰ Time: 10:00 AM
📍 Branch: Powai (Galleria)

We'll contact you soon to confirm the details.

La Coiffure Salon Team
```

## 🔍 API Endpoints

### Create Appointment with WhatsApp
```http
POST /api/appointments
Content-Type: application/json

{
  "branch": "powai",
  "fullName": "John Doe",
  "mobileNumber": "+919876543210",
  "selectedDate": "2024-01-15",
  "selectedTime": "10:00 AM",
  "bookingType": "appointment"
}
```

### Test WhatsApp Message
```http
POST /api/whatsapp/test
Content-Type: application/json

{
  "phoneNumber": "+919876543210",
  "branch": "powai",
  "message": "Test message"
}
```

### Get Appointments by Branch
```http
GET /api/appointments?branch=powai
```

## 🛠️ Troubleshooting

### Common Issues

1. **"Invalid phone number"**
   - Ensure phone numbers are in international format (+91xxxxxxxxxx)
   - Check if the number is registered with WhatsApp

2. **"Access token invalid"**
   - Verify your access token is correct
   - Check if the token has expired

3. **"Phone number ID not found"**
   - Verify your phone number ID is correct
   - Ensure the phone number is verified in WhatsApp Business

### Debug Mode

Enable debug logging by checking the server console for detailed error messages.

## 📞 Support

For WhatsApp Business API issues, refer to:
- [WhatsApp Business API Documentation](https://developers.facebook.com/docs/whatsapp)
- [Meta Business Help Center](https://www.facebook.com/business/help)

## 🔒 Security Notes

- Never commit your access tokens to version control
- Use environment variables for sensitive data
- Regularly rotate your access tokens
- Monitor API usage and costs
