import Pageclient from "./page.client";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  return <Pageclient id={id} />;
}
