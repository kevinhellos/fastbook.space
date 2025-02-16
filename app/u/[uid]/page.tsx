import Pageclient from "./page.client";

export default async function Page({ params }: { params: Promise<{ uid: string }> }) {
  const uid = (await params).uid;
  return <Pageclient uid={uid} />;
}
