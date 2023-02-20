//Mail Content Binding, Send Mail, Send Mail with Attachment

//Mail Content Binding - mailOptionsContentBinding()
const mailOptionsContentBinding = (consigneeEmail, finalCCemail, subject, template, context) => {
var mailOptions = {
      from: 'noreply@dokonaly.com',
      to: consigneeEmail,
      cc: finalCCemail,
      subject: subject,
      template: 'lclmsa15',
      context: {
        consigneeCompanyName: consigneeCompanyName,
        lclbookingId: lclbookingId,
        email: consigneeEmail
      },
      attachments: [{
        filename: canFileName + '.pdf',
        path: `${filePath}/${lclbookingId}/mCANFile.pdf`
      },
      {
        filename: fcFileName + '.pdf',
        path: `${filePath}/${lclbookingId}/mFCFile.pdf`
      }
      ]
    }
}

//Send Mail -
const sendMail = () => {

}

//Send Mail with Attachment - 
const sendMailWithAttachment = () => {

}