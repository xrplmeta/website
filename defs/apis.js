export const schemas = {
	token: {
		type: 'object',
		description: 'A token representation containing both meta- and marketdata',
		properties: {
			currency: {
				type: 'string',
				description: 'Currency code of the token in UTF-8 format'
			},
			issuer: {
				type: 'string',
				description: 'Issuing address of the token'
			},
			meta: {
				type: 'object',
				description: 'A summary of the meta data of the token',
				properties: {
					currency: {
						type: 'object',
						default: {},
						description: 'The meta data strictly belonging to the token',
						properties: {
							name: {
								type: 'string',
								description: 'The display name of the token'
							},
							description: {
								type: 'string',
								description: 'A short description of the token'
							},
							icon: {
								type: 'string',
								description: 'A URL to a icon representing this token'
							},
							trusted: {
								type: 'boolean',
								description: 'Wether or not this token is trusted. Request the full data to see which data source is trusting the token.'
							},
							twitter: {
								type: 'string',
								description: 'The Twitter handle belonging to this token'
							}
						}
					},
					issuer: {
						type: 'object',
						default: {},
						description: 'The meta data of the issuer',
						properties: {
							name: {
								type: 'string',
								description: 'The display name of the issuer'
							},
							description: {
								type: 'string',
								description: 'A short description of the issuer'
							},
							icon: {
								type: 'string',
								description: 'A URL to a icon representing the issuer'
							},
							trusted: {
								type: 'boolean',
								description: 'Wether or not this issuer is trusted. Request the full data to see which data source is trusting the issuer.'
							},
							kyc: {
								type: 'boolean',
								description: 'Wether or not this issuer has absolved a KYC process. Request the full data to see which trustee provided the KYC.'
							},
							twitter: {
								type: 'string',
								description: 'The Twitter handle belonging to the issuer'
							}
						}
					}
				}
			},
			stats: {
				type: 'object',
				description: 'A summary of the market data of the token',
				properties: {
					price: {
						type: 'string',
						description: 'The current price of the token represented as decimal string'
					},
					price_change: {
						type: 'object',
						description: 'The price change over different timeframes',
						properties: {
							day: {
								type: 'number',
								description: 'The change in price in the last 24 hours represented in percent'
							},
							week: {
								type: 'number',
								description: 'The change in price in the last 7 days represented in percent'
							}
						}
					},
					volume: {
						type: 'object',
						description: 'The trading volume over different timeframes',
						properties: {
							day: {
								type: 'string',
								description: 'The accumulated trading volume in the last 24 hours represented as decimal string'
							},
							week: {
								type: 'string',
								description: 'The accumulated trading volume in the last 7 days represented as decimal string'
							}
						}
					},
					marketcap: {
						type: 'string',
						description: 'The current market capitalization of the token represented as decimal string'
					},
					supply: {
						type: 'string',
						description: 'The current supply that has been issued represented as decimal string'
					},
					trustlines: {
						type: 'int',
						description: 'The current count of trustlines set'
					},
					trustlines_change: {
						type: 'object',
						description: 'The change in number of trustlines over different timeframes',
						properties: {
							day: {
								type: 'number',
								description: 'The change in number of trustlines in the last 24 hours'
							},
							week: {
								type: 'number',
								description: 'The change in number of trustlines in the last 7 days'
							}
						}
					}
				}
			}
		}
	}
}

export const rest = [
	{
		id: 'list-tokens',
		title: 'List Tokens',
		description: 'Fetch a list of tokens along with a summary of their market- and metadata.',
		server: 'https://s1.xrplmeta.org',
		path: '/tokens',
		request: {
			query: {
				sort: {
					required: false,
					type: 'string',
					description: 'The metric the returned list of tokens should be sorted by',
					enum: [
						'popular',
						'marketcap',
						'price_day',
						'price_week',
						'volume_week',
						'volume_day',
						'trustlines',
						'trustlines_day',
						'trustlines_week'
					],
					default: 'popular',
				},
				trusted: {
					required: false,
					type: 'boolean',
					description: 'Wether to only include trusted tokens, or non trusted tokens; Omit to ignore trusted status'
				},
				search: {
					required: false,
					type: 'string',
					description: 'Filter results by a search term; Omit to return unfiltered'
				},
				limit: {
					required: false,
					type: 'number',
					description: 'Limit amount of tokens returned',
					default: 100,
				},
				offset: {
					name: 'offset',
					required: false,
					type: 'number',
					description: 'Paginate through all tokens available by moving the offset',
					default: 0,
				}
			}
		},
		response: {
			type: 'array',
			items: schemas.token
		}
	},
	{
		id: 'get-token',
		title: 'Get Token',
		description: 'Fetch an individual token along with a summary of its market- and metadata',
		server: 'https://s1.xrplmeta.org',
		path: '/token/{identifier}',
		request: {
			path: {
				identifier: {
					required: true,
					type: 'string',
					description: 'A string uniquely identifying the token by concatenating the currency code with the issuing address using a colon, for example: "USD:rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B"'
				}
			},
			query: {
				full: {
					required: false,
					type: 'boolean',
					description: 'Set this to true to get all the available metadata alongside the individual sources of each value'
				},
			}
		},
		response: schemas.token
	},
	{
		id: 'get-series',
		title: 'Get Token Series',
		description: 'Get a set of data points representing historical market data for a specific token',
		server: 'https://s1.xrplmeta.org',
		path: '/token/{identifier}/{series}/{timeframe}',
		request: {
			path: {
				identifier: {
					required: true,
					type: 'string',
					description: 'A string uniquely identifying the token by concatenating the currency code with the issuing address using a colon, for example: "USD:rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B"'
				},
				series: {
					required: true,
					type: 'string',
					description: 'The type of market metric you want to fetch',
					enum: ['candle', 'price', 'volume', 'trustlines', 'marketcap', 'supply']
				},
				timeframe: {
					required: true,
					type: 'string',
					description: 'The time interval between the data points',
					enum: ['15m', '1H', '4H', '1D']
				}
			},
			query: {
				start: {
					required: false,
					type: 'int',
					description: 'A unix timestamp specifying the first data point; Negative values are interpreted as time back from now'
				},
				end: {
					required: false,
					type: 'int',
					description: 'A unix timestamp specifying the last data point; Negative values are interpreted as time back from now'
				},
			}
		},
		response: {
			type: 'array',
			items: {
				type: 'object',
				properties: {
					t: {
						type: 'int',
						description: 'The unix timestamp of the data point'
					},
					v: {
						type: 'string',
						description: 'The value of the data point represented as decimal string'
					}
				}
			}
		}
	}
]


export const websocket = [
	{
		id: 'list-tokens',
		title: 'List Tokens',
		description: 'Fetch a list of tokens along with a summary of their market- and metadata.',
		server: 'wss://s1.xrplmeta.org',
		command: 'tokens',
		request: {
			sort: {
				required: false,
				type: 'string',
				description: 'The metric the returned list of tokens should be sorted by',
				enum: [
					'popular',
					'marketcap',
					'price_day',
					'price_week',
					'volume_week',
					'volume_day',
					'trustlines',
					'trustlines_day',
					'trustlines_week'
				],
				default: 'popular',
			},
			trusted: {
				required: false,
				type: 'boolean',
				description: 'Wether to only include trusted tokens, or non trusted tokens; Omit to ignore trusted status'
			},
			search: {
				required: false,
				type: 'string',
				description: 'Filter results by a search term; Omit to return unfiltered'
			},
			limit: {
				required: false,
				type: 'number',
				description: 'Limit amount of tokens returned',
				default: 100,
			},
			offset: {
				name: 'offset',
				required: false,
				type: 'number',
				description: 'Paginate through all tokens available by moving the offset',
				default: 0,
			}
		},
		response: {
			type: 'array',
			items: schemas.token
		}
	},
	{
		id: 'get-token',
		title: 'Get Token',
		description: 'Fetch an individual token along with a summary of its market- and metadata',
		server: 'wss://s1.xrplmeta.org',
		command: 'token',
		request: {
			token: {
				required: true,
				type: 'object',
				description: 'An object identifying the token',
				properties: {
					currency: {
						type: 'string',
						description: 'The currency code of the token'
					},
					issuer: {
						type: 'string',
						description: 'The issuing address of the token'
					}
				}
			},
			full: {
				required: false,
				type: 'boolean',
				description: 'Set this to true to get all the available metadata alongside the individual sources of each value'
			},
		},
		response: schemas.token
	},
	{
		id: 'get-series',
		title: 'Get Token Series',
		description: 'Get a set of data points representing historical market data for a specific token',
		server: 'wss://s1.xrplmeta.org',
		command: 'token_series',
		request: {
			token: {
				required: true,
				type: 'object',
				description: 'An object identifying the token',
				properties: {
					currency: {
						type: 'string',
						description: 'The currency code of the token'
					},
					issuer: {
						type: 'string',
						description: 'The issuing address of the token'
					}
				}
			},
			series: {
				required: true,
				type: 'string',
				description: 'The type of market metric you want to fetch',
				enum: ['candle', 'price', 'volume', 'trustlines', 'marketcap', 'supply']
			},
			timeframe: {
				required: true,
				type: 'string',
				description: 'The time interval between the data points',
				enum: ['15m', '1H', '4H', '1D']
			},
			start: {
				required: false,
				type: 'int',
				description: 'A unix timestamp specifying the first data point; Negative values are interpreted as time back from now'
			},
			end: {
				required: false,
				type: 'int',
				description: 'A unix timestamp specifying the last data point; Negative values are interpreted as time back from now'
			},
		},
		response: {
			type: 'array',
			items: {
				type: 'object',
				properties: {
					t: {
						type: 'int',
						description: 'The unix timestamp of the data point'
					},
					v: {
						type: 'string',
						description: 'The value of the data point represented as decimal string'
					}
				}
			}
		}
	}
]