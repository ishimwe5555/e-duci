const ForgortPasswordTemplate = (token) => `
    <p>Reset your password.</p>
    <p>Please click the link below to reset your password.</p>
    http://${process.env.PRODUCTION_URL}/users/reset-password/${token}`;

const signupTemplate = (username) => `
        <div style="background-color: #f2f2f2; padding: 20px;">
            <h1 style="color: #004d99; text-align: center;">Dear ${username},<br/></h1>
            <p style="color: #000; font-size: 16px;">Your account has been created successfully.<br/><br/>
            <p style="color: #000; font-size: 14px;">Welcome and Thank you for choosing Team-Sostene e-commerce.</p>
          </div>`;

const changePasswordTemplate = (username) => `
    <div style="background-color: #f2f2f2; padding: 20px;">
    <h1 style="color: #004d99; text-align: center;">Password update</h1>
    <p style="color: #000; font-size: 16px;">Dear ${username},\n\nYour password has been changed successfully... Want to change it again, Use the following link:</p>
    <a href="${process.env.SWAGGER_URL}/users/change-password" style="display: block; text-align: center; padding: 10px 20px; background-color: #004d99; color: #fff; text-decoration: none; border-radius: 5px; margin-top: 20px;">Change Password</a>
    <p style="color: #000; font-size: 14px;">Thank you for choosing Team-Sostene e-commerce.</p>          
    </div>`;

const tfaEmailTemplate = (tfaCode) => `
    <div style="background-color: #f2f2f2; padding: 20px;">
    <h1 style="color: #004d99; text-align: center;">Please use the following code to login.</h1>
    <p style="color: #000; font-size: 16px;">CODE: ${tfaCode}</p>
    <p style="color: #000; font-size: 14px;">Thank you for choosing Team-Sostene e-commerce.</p>
    </div>`;
const disableEmailTemplate = (username, disabledReason) => `
    <div style="background-color: #f2f2f2; padding: 20px;">
    <h1 style="color: #004d99; text-align: center;">Dear ${username},<br/></h1>
    <p style="color: #000; font-size: 16px;">Your account has been disabled due to the following reason(s):<br/><br/>
    ${disabledReason}<br/><br/>Please contact the support team if you have any questions.<br/><br/><br/>Best regards, <br/><br/>The support team,</p>
    <p style="color: #000; font-size: 14px;">Thank you for choosing Team-Sostene e-commerce.</p>
    </div>`;

const createCollectionTemplate = (username, collectionName) => `
    <div style="background-color: #f2f2f2; padding: 20px;">
    <h1 style="color: #004d99; text-align: center;">Dear ${username},<br/></h1>
    <p style="color: #000; font-size: 16px;">Your collection ${collectionName} has been created successfully.<br/><br/>
    <p style="color: #000; font-size: 14px;">Thank you for choosing Team-Sostene e-commerce.</p>
    </div>`;
const deleteCollectionTemplate = (username, collectionName) => `
    <div style="background-color: #f2f2f2; padding: 20px;">
    <h1 style="color: #004d99; text-align: center;">Dear ${username},<br/></h1>
    <p style="color: #000; font-size: 16px;">Your collection ${collectionName} has been removed successfully.<br/><br/>
    <p style="color: #000; font-size: 14px;">Thank you for choosing Team-Sostene e-commerce.</p>
    </div>`;
const createProductTemplate = (username, productName) => `
    <div style="background-color: #f2f2f2; padding: 20px;">
    <h1 style="color: #004d99; text-align: center;">Dear ${username},<br/></h1>
    <p style="color: #000; font-size: 16px;">Your product ${productName} has been created successfully.<br/><br/>
    <p style="color: #000; font-size: 14px;">Thank you for choosing Team-Sostene e-commerce.</p>
    </div>`;
const updateProductTemplate = (username, productName) => `
    <div style="background-color: #f2f2f2; padding: 20px;">
    <h1 style="color: #004d99; text-align: center;">Dear ${username},<br/></h1>
    <p style="color: #000; font-size: 16px;">Your product ${productName} has been updated successfully.<br/><br/>
    <p style="color: #000; font-size: 14px;">Thank you for choosing Team-Sostene e-commerce.</p>
    </div>`;
const sendExpiredPasswordMailTemplate = () => `
    <div style="background-color: #F2F2F2; padding: 20px;">
    <h1 style="color: #004D99; text-align: center;">You are receiving this email because your password has expired.</h1>
    <p style="color: #000; font-size: 16px;">Dear Customer,\n\nPlease click on the following button to change your password:</p>
    <a href="${process.env.DEPLOYED_URL}/users/change-password" style="display: block; text-align: center; padding: 10px 20px; background-color: #004D99; color: #fff; text-decoration: none; border-radius: 5px; margin-top: 20px;">Change Password</a>
    <p style="color: #000; font-size: 14px;">Thank you, Team-Sostene e-commerce.</p>
    </div>`;
const ExipedProductTemplate = () => `
<p>Your product has been expired</p>`;

const AdminErrorTemplate = () => `
<p>Server have the problem pleace Rerun.</p>`;

export default {
  ForgortPasswordTemplate,
  changePasswordTemplate,
  tfaEmailTemplate,
  disableEmailTemplate,
  createCollectionTemplate,
  deleteCollectionTemplate,
  createProductTemplate,
  updateProductTemplate,
  signupTemplate,
  sendExpiredPasswordMailTemplate,
  ExipedProductTemplate,
  AdminErrorTemplate,
};
