export function getCurrentDateTimeFormatted(): string {
    var todaysDate = new Date();
    var dd = String(todaysDate.getDate()).padStart(2, '0');
    var mm = String(todaysDate.getMonth() + 1).padStart(2, '0'); 
    var yyyy = todaysDate.getFullYear();
    (todaysDate as any) = dd + '/' + mm + '/' + yyyy;
    var currentTime: string = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });
    return `${todaysDate} ${currentTime}`
}