// const verifyEmailTemplate = ({name, url}) => {
//   return `
//     <p>Dear ${name}</p>
//     <p>Thank You For Registrring Quick_Drop.<p/>
//     <a href=${url} style="color:white;background:#071263;margin-top:10px;padding:5px">
//         Verify Email
//     </a>
//     `;
// };

// export default verifyEmailTemplate

const verifyEmailTemplate = ({ name, url }) => {
  return `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <p>Dear ${name},</p>
      <p>Thank you for registering with <strong>Quick_Drop</strong>!</p>
      <p>Please click the button below to verify your email address:</p>
      <a href="${url}" 
         style="display: inline-block; padding: 10px 20px; background-color: #071263; color: white; text-decoration: none; border-radius: 5px; margin-top: 10px;">
         Verify Email
      </a>
      <p style="margin-top: 20px;">If you did not sign up for Quick_Drop, you can safely ignore this email.</p>
      <p>Regards,<br/>The Quick_Drop Team</p>
    </div>
  `;
};

export default verifyEmailTemplate;
