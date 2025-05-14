const forgotPasswordTemplate = ({ name, otp }) => {
    return `
      <div style="font-family: Arial, sans-serif; font-size: 14px;">
        <p>Dear ${name},</p>
        <p>You have requested a password reset. Please use the following OTP to reset your password:</p>
        <div style="background: yellow; padding: 10px; font-size: 18px; font-weight: bold; width: fit-content; margin: 10px 0;">
          ${otp}
        </div>
        <p>This OTP is valid for 1 hour only. Enter this OTP on the QuickDrop website to proceed with resetting your password.</p>
        <br />
        <p>Thank you!</p>
        <p><strong>QuickDrop Team</strong></p>
      </div>
    `;
  };
  
  export default forgotPasswordTemplate;
  