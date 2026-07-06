import { google } from "googleapis";
import { NextResponse } from "next/server";

function getAuth() {
  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON!);
  return new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });
}

const ROUTE_NAMES: Record<string, string> = {
  nemunas: "Nemunas (25 km)",
  neris: "Neris (18 km)",
  merkys: "Merkys (22 km)",
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { vardas, email, telefonas, marsrutas, data, zmones, pastabos } = body;

    if (!vardas || !email || !telefonas || !marsrutas || !data || !zmones) {
      return NextResponse.json({ error: "Trūksta privalomų laukų" }, { status: 400 });
    }

    const auth = getAuth();
    const calendar = google.calendar({ version: "v3", auth });

    const descriptionLines = [
      `Vardas ir pavardė: ${vardas}`,
      `El. paštas: ${email}`,
      `Telefonas: ${telefonas}`,
      `Maršrutas: ${ROUTE_NAMES[marsrutas] || marsrutas}`,
      `Žmonių skaičius: ${zmones}`,
    ];
    if (pastabos) descriptionLines.push(`\nPastabos:\n${pastabos}`);

    // All-day event — end date must be the next day for Google Calendar
    const endDate = new Date(data);
    endDate.setDate(endDate.getDate() + 1);
    const endDateStr = endDate.toISOString().split("T")[0];

    await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID!,
      requestBody: {
        summary: `🚣 ${vardas} — ${ROUTE_NAMES[marsrutas] || marsrutas} (${zmones} žm.)`,
        description: descriptionLines.join("\n"),
        start: { date: data, timeZone: "Europe/Vilnius" },
        end: { date: endDateStr, timeZone: "Europe/Vilnius" },
        colorId: "2",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Google Calendar error:", error);
    return NextResponse.json(
      { error: "Nepavyko sukurti rezervacijos. Bandykite vėliau." },
      { status: 500 }
    );
  }
}
