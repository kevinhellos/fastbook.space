export default function Container({ children } : { children: React.ReactNode}) {
  return (
    <div className="flex justify-center min-h-screen px-5">
        <div className="w-full max-w-4xl">
            {children}
        </div>
    </div>
  )
}