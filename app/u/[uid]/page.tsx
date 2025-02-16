import Pageclient from "./page.client";

export default async function page({ params }: { params: { uid: string } }) {
  const { uid } = await params;
  return <Pageclient uid={uid}/>
}