import { google } from "googleapis";
import { NextResponse } from "next/server";
import { getGoogleCredentials } from "@/lib/google-auth";

const TOTAL_KAYAKS = 13;

function getAuth() {
  return new google.auth.GoogleAuth({
    credentials: getGoogleCredentials(),
    scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
  });
}

function parseKayakCount(title: string): number {
  const match = title.match(/\d+/);
  return match ? Math.min(parseInt(match[0], 10), TOTAL_KAYAKS) : 1;
}

export async function GET() {
  try {
    const auth = getAuth();
    const calendar = google.calendar({ version: "v3", auth });

    const now = new Date();
    const sixMonthsLater = new Date();
    sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);

    const response = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID!,
      timeMin: now.toISOString(),
      timeMax: sixMonthsLater.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    // Group events by date, sum booked kayaks per day
    const dayMap: Record<string, number> = {};

    for (const event of response.data.items || []) {
      const date = event.start?.date ?? event.start?.dateTime?.split("T")[0];
      if (!date) continue;
      const kayaks = parseKayakCount(event.summary || "");
      dayMap[date] = (dayMap[date] || 0) + kayaks;
    }

    const availability = Object.entries(dayMap).map(([date, booked]) => ({
      date,
      booked: Math.min(booked, TOTAL_KAYAKS),
      available: Math.max(TOTAL_KAYAKS - booked, 0),
      fullyBooked: booked >= TOTAL_KAYAKS,
    }));

    const bookedDates = availability
      .filter((d) => d.fullyBooked)
      .map((d) => d.date);

    return NextResponse.json({ bookedDates, availability, totalKayaks: TOTAL_KAYAKS });
  } catch (error) {
    console.error("Google Calendar error:", error);
    return NextResponse.json({ bookedDates: [], availability: [], totalKayaks: TOTAL_KAYAKS });
  }
}
