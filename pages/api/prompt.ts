// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  output: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //check if the request is coming from localhost or zjierb.com
  console.log(req.headers.host);
  if (req.headers.host === "localhost:3000" || req.headers.host === "zjierb.com") {
    console.log("Request is coming from a known source");
  } else {
    console.log("Request is coming from an unknown source");
    res.status(403).json({ output: "Forbidden" });
  }
  const params: object = {
    messages: [
      {
        role: "system",
        content:
          "You are a web designer who has been given a design task. Return only HTML, CSS, and JavaScript code. Do not include anything else. Use comic sans as the font for the text.",
      },
      {
        role: "user",
        content:
          "Create a single-file HTML webpage for fullscreen desktop with an intensely psychedelic, trippy background. Something slightly complex. In the center, display the word 'zjierb' with a similar but distinct effect. Below it, add a smaller subtitle: 'that feeling when you bite into a pickle and it's a little squishier than you expected' Ensure the text animations remain distinct from the background and do not inherit its pattern. Both texts should link to https://youtu.be/QHjRQwEQjJI with target='_blank'. No link underline. Animate both the background and text. Be creative and experimental.",
      },
    ],
    model: "gpt-4o-mini",
  };

  let e: any = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify(params),
  });

  e = await e.json();
  res.status(200).json({ output: e.choices[0].message.content });
}
