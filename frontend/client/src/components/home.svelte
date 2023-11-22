<script>
    let products = [];
    let isOpen = false;
    let isOpen1 = false;

    let name;
    let description;
    let price;
    let image;
    async function fetchProducts() {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_API_URL}/api/products`,
                {
                    method: "GET",
                }
            );

            if (response.ok) {
                products = await response.json();
                console.log(products);
                console.log(products[0].name);
            } else {
                console.error(
                    "Error al cargar datos de los productos desde la API"
                );
            }
        } catch (err) {
            console.error("Error al realizar la solicitud a la API:", err);
        }
    }

    fetchProducts();

    async function createProduct() {
        const data = {
            name,
            description,
            price,
            image,
        };
        console.log(data);
        const response = await fetch(
            `${import.meta.env.VITE_BASE_API_URL}/api/products`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );

        if (response.ok) {
            const responseData = await response.json();
            if (responseData.created) {
                const newProduct = responseData.client;
                products = [...products, newProduct];
                modal();
                window.location.reload();
            } else {
                console.log("Error al crear al producto", response.status);
                modal();
            }
        } else {
            const errorData = await response.json();
            console.error(
                "Error en la solicitud al servidor:",
                errorData.message
            );
        }
        window.location.reload();
    }

    let originalProductData = {};
    let selectedProduct = null;
    let _id;
    function modalEdit(productId) {
    selectedProduct = products.find((product) => product._id === productId);
    _id = selectedProduct._id;
    console.log(_id);
    originalProductData = {
        name: selectedProduct.name,
        description: selectedProduct.description,
        price: selectedProduct.price,
        image: selectedProduct.image,
    };
    isOpen1 = !isOpen1;
}


    function closeModalEdit() {
        isOpen1 = !isOpen1;
    }

    async function editProduct(name, description, price, image) {
        const data = {
            name,
            description,
            price,
            image,
        };
        console.log(data);
        const response = await fetch(
            `${import.meta.env.VITE_BASE_API_URL}/api/products/${_id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );
        if (response.ok) {
            window.location.reload();
        } else {
            console.log("Error al editar el producto");
        }
    }

    async function deleteProduct(_id) {
        console.log(_id);
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_API_URL}/api/products/${_id}`,
                {
                    method: "DELETE",
                }
            );

            if (response.ok) {
                console.log("producto eliminado exitosamente!");
                window.location.reload();
            } else {
                console.error(
                    "Error al eliminar el producto:",
                    response.statusText
                );
            }
        } catch (err) {
            console.error(
                "Error al realizar la solicitud de eliminación:",
                err
            );
        }
    }

    function handleChangeName(e) {
        if (e.key === " ") {
            e.preventDefault();
        }
        name = e.target.value;
    }

    function handleChangeDescription(e) {
        if (e.key === " ") {
            e.preventDefault();
        }
        description = e.target.value;
    }

    function handleChangePrice(e) {
        if (e.key === " ") {
            e.preventDefault();
        }
        price = e.target.value;
    }

    function handleChangeImage(e) {
        if (e.key === " ") {
            e.preventDefault();
        }
        image = e.target.value;
    }

    function modal() {
        isOpen = !isOpen;
    }
</script>

<body style="font-family: Inika;">
    <div class="container">
        <main>
            <div class="d-grid mx-auto m-5">
                <button
                    class="button-confirm bg-danger border border-danger rounded"
                    style="--bs-bg-opacity: .5;"
                    on:click={modal}>Crear producto</button
                >
            </div>
            <div class="row justify-content-center mx-auto">
                {#each products as product (product._id)}
                    <div
                        class="card bg-secondary p-3"
                        style=" --bs-bg-opacity: .1"
                    >
                        <img
                            src={product.image}
                            class="card-img-top w-50 mx-auto"
                            alt="Producto"
                        />
                        <div class="card-body" style="text-align: center">
                            <h5 class="card-title fw-bold">{product.name}</h5>
                            <p class="card-text">{product.description}</p>
                            <p class="card-text">{product.price}</p>
                        </div>
                        <div class="mx-auto">
                            <button
                                class="button-confirm bg-warning border border-warning rounded"
                                style="--bs-bg-opacity: .5;"
                                on:click={() => modalEdit(product._id)}
                                >Editar</button
                            >
                            <button
                                class="button-confirm bg-danger border border-danger rounded"
                                style="--bs-bg-opacity: .5;"
                                on:click={() => deleteProduct(product._id)}
                                >Eliminar</button
                            >
                        </div>
                    </div>
                {/each}
            </div>
            {#if isOpen}
                <div class="modal-overlay">
                    <div class="modal-software w-50">
                        <div style="text-align:right">
                            <button class="close-button" on:click={modal}
                                >&times;</button
                            >
                        </div>
                        <div class="container-modal">
                            <form on:submit|preventDefault={createProduct}>
                                <h3>Crear Producto</h3>
                                <div class="label-input">
                                    <label for="name" class="form-label"
                                        >Nombre *</label
                                    >
                                    <input
                                        type="text"
                                        class="form-control input-edit"
                                        on:input={handleChangeName}
                                        bind:value={name}
                                        placeholder="Nombre"
                                        required
                                    />
                                </div>
                                <div class="label-input">
                                    <label for="description" class="form-label"
                                        >Descripción *</label
                                    >
                                    <input
                                        type="text"
                                        class="form-control input-edit"
                                        on:input={handleChangeDescription}
                                        bind:value={description}
                                        placeholder="Descripción"
                                        required
                                    />
                                </div>

                                <div class="label-input">
                                    <label for="price" class="form-label"
                                        >Precio *</label
                                    >
                                    <input
                                        class="form-control input-edit"
                                        on:input={handleChangePrice}
                                        bind:value={price}
                                        placeholder="Precio"
                                        required
                                    />
                                </div>

                                <div class="label-input">
                                    <label for="image" class="form-label"
                                        >Imagen *</label
                                    >
                                    <input
                                        type="text"
                                        class="form-control input-edit"
                                        on:input={handleChangeImage}
                                        bind:value={image}
                                        placeholder="Imagen"
                                        required
                                    />
                                </div>

                                <div class="modal-button mt-4">
                                    <button
                                        type="submit"
                                        class="button-confirm bg-success border border-success rounded"
                                        style="--bs-bg-opacity: .5;"
                                        >Crear</button
                                    >
                                    <button
                                        class="button-confirm bg-danger border border-danger rounded"
                                        style="--bs-bg-opacity: .5;"
                                        on:click={modal}>Cancelar</button
                                    >
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            {/if}

            {#if isOpen1}
                <div class="modal-overlay">
                    <div class="modal-software w-50">
                        <div style="text-align:right">
                            <button
                                class="close-button"
                                on:click={closeModalEdit}>&times;</button
                            >
                        </div>
                        <div class="container-modal">
                            <form
                                on:submit|preventDefault={() =>
                                    editProduct(
                                        selectedProduct.name,
                                        selectedProduct.description,
                                        selectedProduct.price,
                                        selectedProduct.image
                                    )}
                            >
                                <h3>Editar</h3>

                                <div class="label-input">
                                    <label for="name" class="form-label"
                                        >Nombre *</label
                                    >
                                    <input
                                        type="text"
                                        class="form-control input-edit"
                                        on:input={handleChangeName}
                                        bind:value={selectedProduct.name}
                                        placeholder="Nombre"
                                        required
                                    />
                                </div>

                                <div class="label-input">
                                    <label for="description" class="form-label"
                                        >Descripción *</label
                                    >
                                    <input
                                        type="text"
                                        class="form-control input-edit"
                                        on:input={handleChangeDescription}
                                        bind:value={selectedProduct.description}
                                        placeholder="descripción"
                                        required
                                    />
                                </div>
                                <div class="label-input">
                                    <label for="precio" class="form-label"
                                        >Precio *</label
                                    >
                                    <input
                                        type="text"
                                        class="form-control input-edit"
                                        on:input={handleChangePrice}
                                        bind:value={selectedProduct.price}
                                        placeholder="precio"
                                        required
                                    />
                                </div>

                                <div class="label-input">
                                    <label for="imagen" class="form-label"
                                        >Imagen *</label
                                    >
                                    <input
                                        type="text"
                                        class="form-control input-edit"
                                        on:input={handleChangeImage}
                                        bind:value={selectedProduct.image}
                                        placeholder="Perez"
                                        required
                                    />
                                </div>

                                <div class="modal-button">
                                    <button type="submit" class="button-confirm bg-success border border-success rounded"
                                    style="--bs-bg-opacity: .5;"
                                        >Guardar</button
                                    >
                                    <button
                                    class="button-confirm bg-danger border border-danger rounded"
                                    style="--bs-bg-opacity: .5;"
                                        on:click={closeModalEdit}
                                        >Cancelar</button
                                    >
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            {/if}
        </main>
    </div>
</body>
