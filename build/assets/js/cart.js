 function removeAllChildNodes(parent) {
        while (parent.firstChild) {
          parent.removeChild(parent.firstChild);
        }
      }

      class ShoppingCart {
        constructor() {
          this._items = [];
        }
        get items() {
          return this._items;
        }

        clear() {
          this._items.clear();
        }

        add(item) {
          this._items.push(item);
          const menuTable = document
            .getElementById("cart")
            .getElementsByTagName("tbody")[0];

          removeAllChildNodes(menuTable);

          this._items.map((value, index, array) => {
            const element = document.createElement("tr");
            element.innerHTML = `<td>${value.name}</td>
          <td>${value.description}</td>
          <td>${value.quantity}</td>
          <td>${value.price}</td>
          <td>${value.total}</td>`;

            menuTable.appendChild(element);
          });

          this.updateTotals();
        }

        remove(item) {
          this._items.splice(
            this._items.findIndex((x) => x.name === item.name),
            1
          );
          const menuTable = document
            .getElementById("cart")
            .getElementsByTagName("tbody")[0];

          removeAllChildNodes(menuTable);

          this._items.map((value, index, array) => {
            const element = document.createElement("tr");
            element.innerHTML = `<td>${value.name}</td>
          <td>${value.description}</td>
          <td>${value.quantity}</td>
          <td>${value.price}</td>
          <td>${value.total}</td>`;

            menuTable.appendChild(element);
          });

          this.updateTotals();
        }

        updateTotals() {
          this._subtotal = 0;
          this._items.map((value, index, array) => {
            this._subtotal += value.total;
          });

          this._delivery = 0;
          if (this._subtotal < 12) {
            this._delivery = 5;
          } else {
            this._delivery = 0;
			
          }

          this._tax = parseFloat(
            ((this._subtotal + this._delivery) * 0.05).toFixed(2)
          );
          this._total = this._subtotal + this._delivery + this._tax;

          document.getElementById(
            "subtotal"
          ).innerText = `$${this._subtotal.toFixed(2)}`;
         
		 document.getElementById(
            "delivery"
          ).innerText = `$${this._delivery.toFixed(2)}`;

          document.getElementById("tax").innerText = `$${this._tax.toFixed(2)}`;
          document.getElementById("total").innerText = `$${this._total.toFixed(
            2
          )}`;
		  
		  	if (this._subtotal > 12) {
				var getDelivery = document.getElementById("delivery");
				getDelivery.innerHTML  = "FREE";
			}
        }

        processPayment() {
			
          const creditCardNumber = document.getElementById("creditCard").value;
		  var creditCardNumberStart = creditCardNumber.substr(0, 4);
		  var creditCardNumberEnd = creditCardNumber.substr(12, 15);
		  var mask = "********";
		  const maskedCreditCardNumber = creditCardNumberStart.concat(mask,creditCardNumberEnd);
		  
          let confirmation = ``;
		 

		   document.getElementById('playmentBlock').innerHTML = "<p>We have charged "+this._total.toFixed(2)+" to your credit card "+ maskedCreditCardNumber +". Your food is on its way.</p>";
          /*alert(
				`We have charged $${this._total.toFixed(2)} to your credit card (${maskedCreditCardNumber}). Your food is on its way.`
          );
		  */
		  
        }
      }

      class Menu {
        constructor() {
          this._items = [];
        }
        get items() {
          return this._items;
        }

        clear() {
          this._items.clear();
        }

        add(item) {
          this._items.push(item);
        }
      }

      class MenuItem {
        constructor(name, description, price, quantity) {
          this._name = name;
          this._description = description;
          this._price = price;
          this._quantity = quantity;
        }

        get name() {
          return this._name;
        }

        get description() {
          return this._description;
        }

        get price() {
          return this._price;
        }

        get quantity() {
          return this._quantity;
        }

        set quantity(value) {
          this._quantity = value;
        }

        get total() {
          return this._quantity * this._price;
        }
      }