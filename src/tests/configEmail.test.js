import { expect } from 'chai';
import configEmail from '../helpers/configEmail';

describe('configEmail', function () {
  it('should return an object with from, to, subject, and html properties', function () {
    const emailConfig = configEmail({
      email: 'test@example.com',
      subject: 'Test Subject',
      content: '<p>Test Content</p>',
    });
    expect(emailConfig).to.be.an('object');
    expect(emailConfig).to.have.property('from');
    expect(emailConfig).to.have.property('to');
    expect(emailConfig).to.have.property('subject');
    expect(emailConfig).to.have.property('html');
  });

  it('should set the from property to the NODE_MAILER_USER environment variable', function () {
    process.env.NODE_MAILER_USER = 'test@example.com';
    const emailConfig = configEmail({
      email: 'test@example.com',
      subject: 'Test Subject',
      content: '<p>Test Content</p>',
    });
    expect(emailConfig.from).to.equal(process.env.NODE_MAILER_USER);
  });

  it('should set the to, subject, and html properties based on the arguments passed in', function () {
    const emailConfig = configEmail({
      email: 'test@example.com',
      subject: 'Test Subject',
      content: '<p>Test Content</p>',
    });
    expect(emailConfig.to).to.equal('test@example.com');
    expect(emailConfig.subject).to.equal('Test Subject');
    expect(emailConfig.html).to.equal('<p>Test Content</p>');
  });
});
