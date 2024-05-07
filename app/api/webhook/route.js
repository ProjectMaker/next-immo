import {NextResponse} from "next/server";

const sendEmail = async ({content}) => {
  const payload = {
    "sender": {
      "name": "Next Immo",
      "email": "contact@aventure-immobiliere.fr"
    },
    "to": [
      {
        "email": "tomperso@yahoo.fr",
        "name": "Tom"
      }
    ],
    "subject": "Welcome tom",
    "htmlContent": "<!DOCTYPE html> <html> <body> " + content + "</body> </html>",
    "textContent": "Please confirm your email address by clicking on the link https://text.domain.com"
  }
  const result = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.BREVO_API_KEY
    },
    body: JSON.stringify(payload)
  })
  return result.json()
}
export async function GET() {
  console.log('oooo')
  return NextResponse.json({ status: 200 });
}





export async function POST(request) {
  //const {content} = await request.json()
  //const result = await sendEmail({content})
  return NextResponse.json({status: 200})
}
