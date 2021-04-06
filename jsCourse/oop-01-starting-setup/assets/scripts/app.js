class Product {
	title = "DEFAULT";
	imageUrl;
	description;
	price;

	constructor(title, image, description, price) {
		this.title = title;
		this.imageUrl = image;
		this.description = description;
		this.price = price;
	}
}

class ShoppingCart {
	items = [];

	set cartItems(value) {
		this.items = value;

		// two decimal places constraint on floats
		this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(2)}</h2>`;
	}

	get totalAmount() {
		const sum = this.items.reduce((prevValue, curItem) => prevValue + curItem.price, 0);
		return sum;
	}

	addProduct(product) {
		// get a copy of the array
		const updatedItems = [...this.items];
		updatedItems.push(product);

		// trigger the setter 
		this.cartItems = updatedItems;
	}

	render() {
		const cartEl = document.createElement('section');
		cartEl.innerHTML = `
			<h2>Total: \$${0}</h2>
			<button>Order Now!</button>
		`;
		cartEl.className = 'cart';
		this.totalOutput = cartEl.querySelector('h2');
		return cartEl;
	}
}

class ProductItem {
	constructor(product) {
		this.product = product;
	}

	addToCart() {
		App.addProductToCart(this.product);
	}

	render() {
		const prodEl = document.createElement("li");
		prodEl.className = "product-item";
		prodEl.innerHTML = `
				<div>
					<img src="${this.product.imageUrl}" alt="${this.product.title}">
					<div class="product-item__content">
						<h2>${this.product.title}</h2>
						<h3>\$${this.product.price}</h3>
						<p>${this.product.description}</p>
						<button>Add to cart</button>
					</div> 
				</div>
			`;

		const addCartButton = prodEl.querySelector('button');
		addCartButton.addEventListener('click', this.addToCart.bind(this))
		return prodEl;
	}
}

class ProductList {
	products = [
		new Product(
			"a pillow",
			"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIQEA8PDw8NDw8PDw0NDw0PDw8NDQ0NFREWFhURFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0ODw0NFSsZFRkrKystLTcrKysrKzctNy0tKysrLSs3KysrKysrLSsrKysrLSsrKysrKysrKysrKysrK//AABEIAOEA4AMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAAAQIDBQQGB//EAEUQAAIBAwAFCQMGCgsAAAAAAAABAgMEEQUSITFRMkFhcYGRobHBEyJyBhRSVMLSM0JigpOyw9Hh8SMlRVNVc4SSlKLw/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFhEBAQEAAAAAAAAAAAAAAAAAAAER/9oADAMBAAIRAxEAPwD7Fc1XrtZeFjC7CPt2lvfeRufwkuzyQkii5XMusmrt88TnQIDrV0uDJK5j09zOXADB2KvHiSU1xRwsjgYNIDOWeZtdpONWX0n5jB3AcLry4+CB1p/S8EMHcBn+2n9LwRGVeeeV4IYNIDLdxUzytixzL9w3WnjlvuSGDTITrRjvlFdDayZy1n+M31ttCjQS63vYwdVS+S5Kcuncir55N7oxS6ctkFTLI0wK5Sm985dSwidvNxktrabw03neSaJUI5kuh5KOwAAyAAAAAAAz79YmnxRWmdGkVsi+Da7/AORxxZRah4EiWShghZGgHgGNMCBIeAYFA0LBLA0gI6pDVLhAUuP7yWoTwSAhqjUCQ0AkhjACqbL7RbG+LOaZ20Y4ikSiYABAAAAAAAHPfLMH0YfiZ0DVuFmEl+TLyMeDLBemTKossRRJDSIolkBoaQiSAMDwAAAxDSAMCJCwABgBoAwAwAAEDAqqI7zhnvXWvM7iUAABAAAAAAAAYaWG1wbXcbhiXGypP4m+/aWB5JqRXEcmUSlUF7c4a9UodcDZjMm6mDnoSzFPiky7AFntegaq9DKwQFqqIlrriV4AC3W6hlAkgLxop28WCb4gX5DJRrsTkwL2yLZRrPj1kXJ55gL6e2SXa+w7jIhOSbaeObcWSrz+k+xJEo0yE60Y75JdGdvcZz1muU+1tijQS9XztjB1Tv0uTGUv+qKvnk3ujFd8n6EFTLI0wK5Sm985Y4LCLrSo09VttPOM70xNE7aO3PDzKOsydJQxUz9KKfbu9DWM3Sb96PHDz1Z/mZg5YBU3AgkaGdcnIztuUcUgNiwlmEe7uZ2ZMzRc/da4Sz3r+BoRYFiGhIlkBjRHI0A8CZJMCBDwDAoHEWCWBpAQcSOoWiAqcdyJahNIkBDVGoEhoBJDYxMCuTOm3Xurp2nI+HHYd8VhJcFglDMnSDzUfQorwz6msZN4v6SX5v6qEFIZGkMo4rlGfJGncIz6iA6NGvEpLis9z/iacDHs5YmunK8DWiwLkyZVFliAkhpCRIAGIkgDA8AADAQ0AYESFgADADQBgBiAYmMTArivej1o7jihy49Z2koDKvvwj7PI1THu5ZqT6/RCCMRlaRYmUUV0ZtZGrVRm3CApovEovpXdk2IGKbEJAWpl0WUxLYgTRMgiSAkiQokgAeAAAGCAAExgBHBJIAAAGyJAMjJkmVSZRO2WZZ4bTsOSze2XUjrJQGNerFSXWn4I2TCvamas+hpdySEBEtRTAuiUQmjOuEak0Z9ygOGRpWzzGL6Md2wzpGhY8hdb8yDqgXRKUWQKLEWIrRNMCxDQkNASDAiSABDAgBABQ0hggIFIi2NsTKItldRkpFbAusuU+r1Ow5LFrMlz7DrJQmzzMamcvnbbfW9p6Ss/dl8MvI8tRe7iIO2mXRKKJ0RKHI4Lo7pHBdMDhmaVqvdj1JmZJmtQXux+GPkBYWU2QSJxAtROKK4lqAmkMQ0AxgAAMSGAhoAAaAEDIIkWiYmUVtFckXMpqATs+X1pnccFry11M7yUcOmq+pRlxnimu3f4ZMS26Du+UstlKK55Sl3JL7Rw2z5tz8xB2x6UTiiMJLnJqHBlEZsz7qR31VsMu5YHNJmvbP3IfDHyMNyN2i/dj0RivAC5E0VLJYmBbEmiMSYEokkIAJoBDAAAAGABkgGwQAACY8gURZXMtZXMBWfLfHB3HBbctdTO8lGLpeGtVT36sEsdbbfocMUs47uaS/eX39acas37KpJNrDhqNPZjbmSMa4v7pyxGxpyhs96dz7Ob/NUJJf7ijbhLG/vL9j3PD4o89Svrpb7SLXD5ysrt1AneXr2QtbaPB1K86vhGEfMaNurUa2S2PwfSZl29/wD7aZHsdKyeXUsF0Rt7jC7HWK3ojSEuVc0l8NB+smTR01XufYz0FvPMIPjGL8DzVH5L3L5V29u/FvQWX3HoLSnqQhDOtqRjDWwlrYWM4WxAdkS1FMC6JRZAsRBE0BMaEhgMZHIwAAYAMYgAYgGAgGACZCRMiwIW699dCZ3HJapKT449TrJRXOinvIfNY8C8CCj5rHgNW0eBcAFXsI8B+xXAsADnucRhOXCMmuvGwwKbN3Sf4Gp8PqefpvtLB2QWS6BTR3F8Si1E0VomgJoZFMeQGNCABjyRACQxIAGMQAMQ8iYAJjyRbAVN4nHpyvA7Dgk9sX0rzO8lAAAQAAAAAABlfKCviEYf3ktvwx2+eDOt+gt+UMm6sIr8WGe9v7pTbPsxvRYOtFkURi095JQ4PYUWRZNMqYtYC9Mkc6mSjUAuyPJVrA5gW6wslakCkBYmSyVZDWAtyPJVkakBZkZXrDUgJ5ExZFrAQm8YeM4aeOJ3xeUmufaZ8jqs5ZguhtEovAAIAAAAACqu3h4AxNIU9arUlvWyPcl65KKeM79q5+ftQTuKi1s0KzeZP3VBp7d6zJGbUvbpt/1e8J+7L5zGM8ccauzqyzWjbpy27f4Muxzx2PwZg0725xiVlJ9PtoL0IVby+eynZ28eEqlec32xjBeY0b/tduGsPnRFy39ew8pKGl23iWjop8zoXU2up+2S8CcbPSj317VfDb1ftVGNHppyw88zQKoYVHRN7jEriljgraOPM6Foe7+tY6remiaNiNUh7Yx6mhrx5xfVVnhQt/WLM64+Sd1U5WkL38xwpfqJDR6yNQakeTtvkrd01iGkr9L8uUK366Z30dC3q/tCu+uhav7A0b6mGuzHWh7z6/W/49r90FoW7/xC4/Q2v3Bo2VNhrsxKmh7zm0hcfoLT7hxVtD6R5tJVu22tPuDR6hVOJZGR5BWelY7rujV/zbWH2HE66NbSCS16VnOXGLr0ovset5l0enyM86ry/wDq1r+nqr9mP59f/VbV/wCoqr9mNHoGW2ksNrjtRgUtJXf49lBfBda2ztpo0LSvVnOGaDgs5lKU4vHQkt5NG0AAQAAAAJgAFciIAAAhgADQABJDYAAAAAAAADAAATEwABERgAmDGACJwAAP/9k=",
			"a soft pillow",
			19.99,
		),
		{
			title: "a carpet",
			imageUrl:
				"data:image/jpeg;base64,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",
			price: 89.99,
			description: "a carpet",
		},
	];
	constructor() { }

	render() {
		const prodList = document.createElement("ul");
		prodList.className = "product-list";

		for (const prod of this.products) {
			const productItem = new ProductItem(prod);

			const prodEl = productItem.render();
			prodList.append(prodEl);
		}
		return prodList;
	}
}

class Shop {
	render() {
		const renderHook = document.getElementById("app");

		this.cart = new ShoppingCart();
		const cartEl = this.cart.render();
		const productList = new ProductList();
		const prodListEl = productList.render();

		renderHook.append(cartEl);
		renderHook.append(prodListEl);
	}
}

class App {
	// not technically necessary but makes clear that the property is static; readability
	static cart;

	static init() {
		const shop = new Shop();
		shop.render();
		this.cart = shop.cart;
	}

	static addProductToCart(product) {
		this.cart.addProduct(product);
	}
}

// executes init method on class itself
App.init();



