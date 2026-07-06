import { put, list } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const { blobs } = await list({ prefix: "reviews/meta/" });

    const reviews = await Promise.all(
      blobs
        .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
        .map(async (blob) => {
          const res = await fetch(blob.url);
          return res.json();
        })
    );

    return NextResponse.json({ reviews });
  } catch {
    return NextResponse.json({ reviews: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const text = formData.get("text") as string;
    const rating = Number(formData.get("rating"));
    const photos = formData.getAll("photos") as File[];

    if (!name || !text || !rating) {
      return NextResponse.json({ error: "Trūksta laukų" }, { status: 400 });
    }

    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

    const photoUrls: string[] = [];
    for (const photo of photos) {
      if (photo.size > 0) {
        const { url } = await put(`reviews/photos/${id}-${photo.name}`, photo, {
          access: "public",
        });
        photoUrls.push(url);
      }
    }

    const review = {
      id,
      name,
      text,
      rating,
      photos: photoUrls,
      date: new Date().toISOString(),
    };

    await put(`reviews/meta/${id}.json`, JSON.stringify(review), {
      access: "public",
      contentType: "application/json",
    });

    return NextResponse.json({ success: true, review });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Nepavyko išsaugoti" }, { status: 500 });
  }
}
