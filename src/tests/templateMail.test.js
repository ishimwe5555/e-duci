// // import assert from 'assert';
import chai from 'chai';
import { notificationTemplates } from '../helpers';

const { expect } = chai;

describe('Notification templates', function () {
  it('should return the correct template', function () {
    const token = 'abcd1234';
    const expectedOutput = `
    <p>Reset your password.</p>
    <p>Please click the link below to reset your password.</p>
    http://${process.env.PRODUCTION_URL}/users/reset-password/${token}`;
    const result = notificationTemplates.ForgortPasswordTemplate(token);
    expect(result).to.equal(expectedOutput);
  });

  it('should return the correct template', function () {
    const username = 'ishimwe';
    const expectedOutput = `
        <div style="background-color: #f2f2f2; padding: 20px;">
            <h1 style="color: #004d99; text-align: center;">Dear ${username},<br/></h1>
            <p style="color: #000; font-size: 16px;">Your account has been created successfully.<br/><br/>
            <p style="color: #000; font-size: 14px;">Welcome and Thank you for choosing Team-Sostene e-commerce.</p>
          </div>`;
    const result = notificationTemplates.signupTemplate(username);
    expect(result).to.equal(expectedOutput);
  });

  it('should return the correct template', function () {
    const username = 'ishimwe';
    const expectedOutput = `
    <div style="background-color: #f2f2f2; padding: 20px;">
    <h1 style="color: #004d99; text-align: center;">Password update</h1>
    <p style="color: #000; font-size: 16px;">Dear ${username},\n\nYour password has been changed successfully... Want to change it again, Use the following link:</p>
    <a href="${process.env.SWAGGER_URL}/users/change-password" style="display: block; text-align: center; padding: 10px 20px; background-color: #004d99; color: #fff; text-decoration: none; border-radius: 5px; margin-top: 20px;">Change Password</a>
    <p style="color: #000; font-size: 14px;">Thank you for choosing Team-Sostene e-commerce.</p>          
    </div>`;
    const result = notificationTemplates.changePasswordTemplate(username);
    expect(result).to.equal(expectedOutput);
  });

  it('should return the correct template', function () {
    const username = 'ishimwe';
    const collectionName = 'Collection Test';
    const expectedOutput = `
    <div style="background-color: #f2f2f2; padding: 20px;">
    <h1 style="color: #004d99; text-align: center;">Dear ${username},<br/></h1>
    <p style="color: #000; font-size: 16px;">Your collection ${collectionName} has been created successfully.<br/><br/>
    <p style="color: #000; font-size: 14px;">Thank you for choosing Team-Sostene e-commerce.</p>
    </div>`;
    const result = notificationTemplates.createCollectionTemplate(
      username,
      collectionName
    );
    expect(result).to.equal(expectedOutput);
  });

  it('should return the correct template', function () {
    const username = 'ishimwe';
    const collectionName = 'Collection Test';
    const expectedOutput = `
    <div style="background-color: #f2f2f2; padding: 20px;">
    <h1 style="color: #004d99; text-align: center;">Dear ${username},<br/></h1>
    <p style="color: #000; font-size: 16px;">Your collection ${collectionName} has been removed successfully.<br/><br/>
    <p style="color: #000; font-size: 14px;">Thank you for choosing Team-Sostene e-commerce.</p>
    </div>`;
    const result = notificationTemplates.deleteCollectionTemplate(
      username,
      collectionName
    );
    expect(result).to.equal(expectedOutput);
  });

  it('should return the correct template', function () {
    const username = 'ishimwe';
    const productName = 'Collection Test';
    const expectedOutput = `
    <div style="background-color: #f2f2f2; padding: 20px;">
    <h1 style="color: #004d99; text-align: center;">Dear ${username},<br/></h1>
    <p style="color: #000; font-size: 16px;">Your product ${productName} has been created successfully.<br/><br/>
    <p style="color: #000; font-size: 14px;">Thank you for choosing Team-Sostene e-commerce.</p>
    </div>`;
    const result = notificationTemplates.createProductTemplate(
      username,
      productName
    );
    expect(result).to.equal(expectedOutput);
  });

  it('should return the correct template', function () {
    const username = 'ishimwe';
    const productName = 'Collection Test';
    const expectedOutput = `
    <div style="background-color: #f2f2f2; padding: 20px;">
    <h1 style="color: #004d99; text-align: center;">Dear ${username},<br/></h1>
    <p style="color: #000; font-size: 16px;">Your product ${productName} has been updated successfully.<br/><br/>
    <p style="color: #000; font-size: 14px;">Thank you for choosing Team-Sostene e-commerce.</p>
    </div>`;
    const result = notificationTemplates.updateProductTemplate(
      username,
      productName
    );
    expect(result).to.equal(expectedOutput);
  });

  it('should return the correct template', function () {
    const username = 'ishimwe';
    const disabledReason = 'disable Test';
    const expectedOutput = `
    <div style="background-color: #f2f2f2; padding: 20px;">
    <h1 style="color: #004d99; text-align: center;">Dear ${username},<br/></h1>
    <p style="color: #000; font-size: 16px;">Your account has been disabled due to the following reason(s):<br/><br/>
    ${disabledReason}<br/><br/>Please contact the support team if you have any questions.<br/><br/><br/>Best regards, <br/><br/>The support team,</p>
    <p style="color: #000; font-size: 14px;">Thank you for choosing Team-Sostene e-commerce.</p>
    </div>`;
    const result = notificationTemplates.disableEmailTemplate(
      username,
      disabledReason
    );
    expect(result).to.equal(expectedOutput);
  });

  it('should return the correct template', function () {
    const tfaCode = 'ishimwe';
    const expectedOutput = `
    <div style="background-color: #f2f2f2; padding: 20px;">
    <h1 style="color: #004d99; text-align: center;">Please use the following code to login.</h1>
    <p style="color: #000; font-size: 16px;">CODE: ${tfaCode}</p>
    <p style="color: #000; font-size: 14px;">Thank you for choosing Team-Sostene e-commerce.</p>
    </div>`;
    const result = notificationTemplates.tfaEmailTemplate(tfaCode);
    expect(result).to.equal(expectedOutput);
  });
});
