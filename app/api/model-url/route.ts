import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const rawName = searchParams.get("name");
  if (!rawName) return new Response("Missing name", { status: 400 });

  const cleanName = rawName.split("?")[0];

  const s3 = new S3Client({
    region: process.env.R2_REGION!,
    endpoint: process.env.R2_ENDPOINT!,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY!,
      secretAccessKey: process.env.R2_SECRET_KEY!,
    },
    forcePathStyle: true,
  });

  const command = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET!,
    Key: cleanName,
  });

  const s3Res = await s3.send(command);

  return new Response(s3Res.Body as ReadableStream, {
    headers: {
      "Content-Type": "model/gltf-binary",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
