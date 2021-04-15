      const cart = new ShoppingCart();
      const menu = new Menu();
      (function initializeMenu() {
        menu.add(
          new MenuItem(
            "Hamburger",
            "Single patty, with ketchup and mustard",
            1.99,
            null
          )
        );
        menu.add(
          new MenuItem(
            "Cheeseburger",
            "Single patty, slice of cheddar cheese, with ketchup and mustard",
            2.49,
            null
          )
        );
        menu.add(
          new MenuItem(
            "Fries",
            "Single patty, with ketchup and mustard",
            1.79,
            null
          )
        );
        menu.add(
          new MenuItem(
            "Onion Rings",
            "Single patty, with ketchup and mustard",
            2.79,
            null
          )
        );

        const menuTable = document
          .getElementById("menu")
          .getElementsByTagName("tbody")[0];
        menu.items.map((value, index, array) => {
          const element = document.createElement("tr");
          element.innerHTML = `<td>${value.name}</td>
          <td>${value.description}</td>
          <td><input type='number' id='${value.name}Quantity' name="quantity" value="1" min="1" max="10" /></td>
          <td>${value.price}</td>`;

          const addButton = document.createElement("button");
          addButton.innerText = "Add";
		  addButton.className = "btn btn-success";
          addButton.onclick = function () {
            const currentQuantityInput = document.getElementById(
              `${value.name}Quantity`
            ).value;
            let quantity = 0;
            if (
              currentQuantityInput !== undefined &&
              currentQuantityInput !== null &&
              currentQuantityInput.trim() !== ""
            ) {
              quantity = parseInt(currentQuantityInput);
            }
            const clone = Object.assign(
              Object.create(Object.getPrototypeOf(value)),
              value
            );

            clone.quantity = quantity;
            console.dir(clone);
            cart.add(clone);
          };
          const actionTableCell = document.createElement("td");
          actionTableCell.appendChild(addButton);
          element.appendChild(actionTableCell);

          menuTable.appendChild(element);
        });
      })();
	  
	  
	  