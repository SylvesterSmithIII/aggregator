import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import OpenAI from 'openai';


// Make sure to replace 'your_secret_key' with your actual OpenAI secret API key

const openai = new OpenAI(
  {
    apiKey: "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"
  }
);

async function queryGPT3Turbo(prompt) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: "Sample headline: Marvel's Studio is facing a bit of a sticky situation folks."
        },
        {
          role: "system",
          content: "Marvel's Ups and Downs: Are Superheroes Losing Their Superpowers?"
        },
        {
          role: "user",
          content: "Its nice but make it even funnier. Like say they are in deep shit. But no cussing."
        },
        {
          role: "system",
          content: "Okay sounds good im ready for the text."
        },
        {
        role: "user",
        content: `Take the body of this news website article and return to me the headline of the article and the body of the text.
        However, I want a funny and relatible spin on it to make it digestable for people who don't usually watch the news.
        \n\n
        ${prompt}
      `
      }]
    })
    // Log the response from the OpenAI API

    console.log(response.choices[0].message)

    return response.choices[0].message.content;
  } catch (error) {
    // Log any errors that occur during the API request
    console.error("Error querying OpenAI API:", error);
    throw error;
  }
}


export async function GET(request) {
  const fullUrl = new URL(request.url)
  const url = fullUrl.searchParams.get('url')

  try {
    const browser = await puppeteer.launch( {'headless': "true"} );
    const page = await browser.newPage();
    await page.goto(url);

    // Perform scraping operations here

    const pageText = await page.evaluate(() => document.body.innerText);

    await browser.close();

    const text = await queryGPT3Turbo(pageText)

    return NextResponse.json({ text });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' });
  }
}
