const Shopify = require('shopify-api-node')
const express = require('express')
const bodyParser = require('body-parser')

// Set up the Shopify API client for the source store
const sourceShopify = new Shopify({
	shopName: 'grow-with-grief.myshopify.com',
	apiKey: '5af661bf86b8455fdf365ad03551b22d',
	password: 'a4a87a633b1c4bcf3f2fc1f33f6386d2',
})

// Set up the Shopify API client for the destination store
const destShopify = new Shopify({
	shopName: 'griefshine.myshopify.com',
	apiKey: 'YOUR_API_KEY',
	password: 'YOUR_API_PASSWORD',
})

// Set up an Express server
const app = express()
app.use(bodyParser.json())

// Set up a webhook endpoint to listen for incoming orders
app.post('/webhooks/orders/create', async (req, res) => {
	// Extract the order data from the webhook payload
	const order = req.body

	try {
		// Create the same order in the destination store
		await destShopify.order.create(order)

		// Send a success response to Shopify
		res.sendStatus(200)
	} catch (error) {
		// Send an error response to Shopify
		console.error(error)
		res.sendStatus(500)
	}
})

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`)
})
