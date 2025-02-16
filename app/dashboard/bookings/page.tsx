export default function page() {
  return (
    <>
      <h1 className="lg:text-3xl text-2xl font-medium">
        Bookings
      </h1>
      
      <div className="px-3.5 py-2 rounded-sm bg-purple-100 border-l-2 border-l-purple-700 mt-5 text-sm">
        Page is under maintenance. Check back later.
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 mt-5">
        <div className="border p-5 rounded-md">
          <h2 className="font-medium text-lg">Availability</h2>

          <div className="overflow-x-auto">
            <table className="table">
              <tbody>

                <tr>
                  <td>Monday</td>
                  <td>
                    <input type="checkbox" className="toggle" defaultChecked />
                  </td>
                </tr>

                <tr>
                  <td>Monday</td>
                  <td>
                    <input type="checkbox" className="toggle" defaultChecked />
                  </td>
                </tr>

                <tr>
                  <td>Monday</td>
                  <td>
                    <input type="checkbox" className="toggle" defaultChecked />
                  </td>
                </tr>

                <tr>
                  <td>Monday</td>
                  <td>
                    <input type="checkbox" className="toggle" defaultChecked />
                  </td>
                </tr>

                <tr>
                  <td>Monday</td>
                  <td>
                    <input type="checkbox" className="toggle" defaultChecked />
                  </td>
                </tr>

                <tr>
                  <td>Monday</td>
                  <td>
                    <input type="checkbox" className="toggle" defaultChecked />
                  </td>
                </tr>

                <tr>
                  <td>Monday</td>
                  <td>
                    <input type="checkbox" className="toggle" defaultChecked />
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>  
    </>
  )
}
