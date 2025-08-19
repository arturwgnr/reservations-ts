//docs
const customerName = document.getElementById('customer') as HTMLInputElement;
const numberOfPeople = document.getElementById('people') as HTMLInputElement;
const addButton = document.getElementById('add-button') as HTMLButtonElement;
const ul = document.getElementById('reservation-list') as HTMLUListElement;
const payment = document.getElementById('payment') as HTMLSelectElement

//types
type reservationStatus = 'pending' | 'confirmed' | 'cancelled';
type paymentMethod = 'card' | 'cash' | 'voucher';

//interface
interface Reservation {
  id: number,
  name: string,
  guests: number,
  payment?: paymentMethod,
  status: reservationStatus,
}

let reservations: Reservation[] = [];

addButton.addEventListener(('click'), (e) => {
  e.preventDefault()
  addReservation()
  console.log("Here they are:", reservations)
})

//funcoes
function addReservation() {
  const name = customerName.value;
  const guests = numberOfPeople.value;
  let customerPayment = payment.value as paymentMethod;

  if(!customerPayment) {
    customerPayment = 'cash'
  }

  const newReservation: Reservation = {
    id: Date.now(),
    name: name,
    guests: Number(guests),
    payment: customerPayment,
    status: 'pending'
  }


    reservations.push(newReservation)

    console.log(newReservation)
    renderReservations()

  return newReservation

}

function renderReservations() {
  ul.innerHTML = "";

  reservations.forEach((reservation) => {
    const li = document.createElement("li");

    // reset class e adicionar baseado no status
    li.className = ""; 
    li.classList.add(reservation.status);

    const span = document.createElement("span");
    span.textContent = `Name: ${reservation.name} | Guests: ${reservation.guests} | Payment: ${reservation.payment ?? "N/A"} | Status: ${reservation.status}`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "x";
    deleteButton.classList.add("delete-button");

    const approveButton = document.createElement("button");
    approveButton.textContent = "✓";
    approveButton.classList.add("approve-button");

    deleteButton.addEventListener("click", () => {
      reservations = reservations.map(r =>
        r.id === reservation.id ? { ...r, status: "cancelled" } : r
      );
      renderReservations();
    });

    approveButton.addEventListener("click", () => {
      reservations = reservations.map(r =>
        r.id === reservation.id ? { ...r, status: "confirmed" } : r
      );
      renderReservations();
    });

    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add("button-group");
    buttonGroup.append(deleteButton, approveButton);

    li.append(span, buttonGroup);
    ul.append(li);
  });
}
