export const schemas = {
	basicToken: {
		type: 'object',
		properties: {
			currency: {
				type: 'string',
				description: 'The currency code of the token. Can be HEX or UTF-8.'
			},
			issuer: {
				type: 'string',
				description: 'The issuing address of the token.'
			}
		}
	},
	serverInfo: {
		type: 'object',
		properties: {
			server_version: {
				type: 'string',
				description: 'The exact version of the server software running.'
			},
			available_ledgers: {
				type: 'object',
				description: 'The available range of ledger data the server has scraped so far.',
				properties: {
					sequence: {
						type: 'object',
						properties: {
							start: {
								type: 'int',
								description: 'The ledger sequence of the oldest ledger.'
							},
							end: {
								type: 'int',
								description: 'The ledger sequence of the most recent ledger.'
							}
						}
					},
					time: {
						type: 'object',
						properties: {
							start: {
								type: 'int',
								description: 'The unix timestamp of the closing time of the oldest ledger.'
							},
							end: {
								type: 'int',
								description: 'The unix timestamp of the closing time of the most recent ledger.'
							}
						}
					},
				}
			},
			tokenlists: {
				type: 'array',
				description: 'A list of all tokenlists that the server is relying on.',
				items: {
					type: 'object',
					properties: {
						id: {
							type: 'string',
							description: 'The assigned identifier of the list. Use this when preferring meta sources.'
						},
						url: {
							type: 'string',
							description: 'The URL pointing to the .toml file.'
						},
						trust_level: {
							type: 'int',
							description: 'The maximum trust level this tokenlist can set for any token.'
						}
					}
				}
			},
			total_tokens: {
				type: 'int',
				description: 'Total number of issued tokens. Historical tokens included.'
			},
			total_nfts: {
				type: 'int',
				description: 'Total number of issued NFTs. Burned NFTs included.'
			}
		}
	},
	ledger: {
		type: 'object',
		properties: {
			sequence: {
				type: 'int',
				description: 'The sequence number of this ledger. Also often called "ledger index".'
			},
			hash: {
				type: 'string',
				description: 'The HEX encoded hash of this ledger.'
			},
			close_time: {
				type: 'int',
				description: 'The unix timestamp of when this ledger was closed.'
			},
			tx_count: {
				type: 'int',
				description: 'The total count of transactions included in this ledger.'
			},
			tx_types: {
				type: 'object',
				description: 'The count of transactions included in this ledger by transaction type.'
			},
			fee_min: {
				type: 'int',
				description: 'The smallest fee paid by a transaction included in this ledger.'
			},
			fee_max: {
				type: 'int',
				description: 'The largest fee paid by a transaction included in this ledger.'
			},
			fee_avg: {
				type: 'int',
				description: 'The average fee of all transactions included in this ledger.'
			},
		}
	},
	token: {
		type: 'object',
		description: 'A token representation containing both meta- and marketdata.',
		properties: {
			currency: {
				type: 'string',
				description: 'Currency code of the token. Can be HEX or UTF-8.'
			},
			issuer: {
				type: 'string',
				description: 'Issuing address of the token.'
			},
			meta: {
				type: 'object',
				description: 'A summary of the meta data of the token.',
				properties: {
					token: {
						type: 'object',
						default: {},
						description: 'The meta data strictly belonging to the token.',
						properties: {
							name: {
								type: 'string',
								description: 'The display name of the token.'
							},
							description: {
								type: 'string',
								description: 'A short description of the token.'
							},
							icon: {
								type: 'string',
								description: 'A URL to an icon representing this token.'
							},
							trust_level: {
								type: 'int',
								description: 'The trust level of this token. Values range between 0 - 3.'
							},
							weblinks: {
								type: 'array',
								description: 'A list of websites associated with this token.',
								items: {
									type: 'object',
									properties: {
										url: {
											type: 'string',
											description: 'The URL of the website.'
										},
										type: {
											type: 'string',
											description: 'The type of the content the link points to.',
											enum: [
												'website',
												'socialmedia',
												'support',
												'sourcecode',
												'whitepaper',
												'audit',
												'report'
											]
										},
										title: {
											type: 'string',
											description: 'A title for the link meant to clear ambiguities.'
										}
									}
								}
							}
						}
					},
					issuer: {
						type: 'object',
						default: {},
						description: 'The meta data of the issuer.',
						properties: {
							name: {
								type: 'string',
								description: 'The display name of the issuer.'
							},
							description: {
								type: 'string',
								description: 'A short description of the issuer.'
							},
							icon: {
								type: 'string',
								description: 'A URL to a icon representing the issuer.'
							},
							kyc: {
								type: 'boolean',
								description: 'Wether or not this issuer has absolved any Know-Your-Customer processes.'
							},
							trust_level: {
								type: 'int',
								description: 'The trust level of this issuer. Values range between 0 - 3.'
							},
							weblinks: {
								type: 'array',
								description: 'A list of websites associated with this issuer.',
								items: {
									type: 'object',
									properties: {
										url: {
											type: 'string',
											description: 'The URL of the website.'
										},
										type: {
											type: 'string',
											description: 'The type of the content the link points to.',
											enum: [
												'website',
												'socialmedia',
												'support',
												'sourcecode',
												'whitepaper',
												'audit',
												'report'
											]
										},
										title: {
											type: 'string',
											description: 'A title for the link meant to clear ambiguities.'
										}
									}
								}
							}
						}
					}
				}
			},
			metrics: {
				type: 'object',
				description: 'A summary of the market and ledger data of the token.',
				properties: {
					trustlines: {
						type: 'int',
						description: 'The current number of trustlines set to this token.'
					},
					holders: {
						type: 'int',
						description: 'The current number of accounts holding a non zero balance of the token.'
					},
					supply: {
						type: 'string',
						description: 'The current supply that has been issued represented as decimal string'
					},
					marketcap: {
						type: 'string',
						description: 'The current XRP market capitalization of the token represented as decimal string'
					},
					price: {
						type: 'string',
						description: 'The current price of the token in XRP represented as decimal string.'
					},
					changes: {
						type: 'object',
						description: 'The changes of all metrics over time. Only present if "include_changes" is set to true.',
						properties: {
							'24h': {
								type: 'object',
								description: 'The changes over the last 24 hour time span.',
								properties: {
									trustlines: {
										type: 'object',
										properties: {
											delta: {
												type: 'int',
												description: 'The number of trustlines changed.'
											},
											percent: {
												type: 'number',
												description: 'The percentage change of trustlines.'
											}
										}
									},
									holders: {
										type: 'object',
										properties: {
											delta: {
												type: 'int',
												description: 'The number of holders changed.'
											},
											percent: {
												type: 'number',
												description: 'The percentage change of holders.'
											}
										}
									},
									supply: {
										type: 'object',
										properties: {
											delta: {
												type: 'string',
												description: 'The total amount of token supply changed as decimal string.'
											},
											percent: {
												type: 'number',
												description: 'The percentage change of the token supply.'
											}
										}
									},
									marketcap: {
										type: 'object',
										properties: {
											delta: {
												type: 'int',
												description: 'The total amount of marketcap in XRP changed as decimal string.'
											},
											percent: {
												type: 'number',
												description: 'The percentage change of the marketcap.'
											}
										}
									},
									price: {
										type: 'object',
										properties: {
											percent: {
												type: 'number',
												description: 'The percentage change of the price in XRP.'
											}
										}
									}
								}
							},
							'7d': {
								type: 'object',
								description: 'The changes over the last 7 day time span.',
								properties: {
									trustlines: {
										type: 'object',
										properties: {
											delta: {
												type: 'int',
												description: 'The number of trustlines changed.'
											},
											percent: {
												type: 'number',
												description: 'The percentage change of trustlines.'
											}
										}
									},
									holders: {
										type: 'object',
										properties: {
											delta: {
												type: 'int',
												description: 'The number of holders changed.'
											},
											percent: {
												type: 'number',
												description: 'The percentage change of holders.'
											}
										}
									},
									supply: {
										type: 'object',
										properties: {
											delta: {
												type: 'string',
												description: 'The total amount of token supply changed as decimal string.'
											},
											percent: {
												type: 'number',
												description: 'The percentage change of the token supply.'
											}
										}
									},
									marketcap: {
										type: 'object',
										properties: {
											delta: {
												type: 'int',
												description: 'The total amount of marketcap in XRP changed as decimal string.'
											},
											percent: {
												type: 'number',
												description: 'The percentage change of the marketcap.'
											}
										}
									},
									price: {
										type: 'object',
										properties: {
											percent: {
												type: 'number',
												description: 'The percentage change of the price in XRP.'
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	},
	seriesPoint: {
		type: 'object',
		properties: {
			time: {
				type: 'int',
				description: 'The unix timestamp of the data point. Only present if a time range was specified.'
			},
			sequence: {
				type: 'int',
				description: 'The ledger sequence of the data point. Only present if a sequence range was specified.'
			},
			value: {
				type: 'string | integer',
				description: 'The value of the data point.'
			}
		}
	}
}

export const rest = [
	{
		id: 'server-info',
		title: 'Server Info',
		description: 'Fetch generic information about the server.',
		server: 'https://s1.xrplmeta.org',
		path: '/server',
		request: {},
		response: schemas.serverInfo
	},
	{
		id: 'ledger-lookup',
		title: 'Ledger Lookup',
		description: 'Fetch metadata about a specific ledger.',
		server: 'https://s1.xrplmeta.org',
		path: '/ledger',
		request: {
			query: {
				sequence: {
					required: false,
					type: 'int',
					description: 'The ledger sequence of the ledger. Optional if time is specified.',
				},
				time: {
					required: false,
					type: 'int',
					description: 'The unix timestamp of the ledger. Optional if sequence is specified.',
				},
				strict: {
					required: false,
					type: 'boolean',
					description: 'If set to true, either the sequence or time parameter has to be an exact match.',
					default: false
				},
			}
		},
		response: schemas.ledger
	},
	{
		id: 'list-tokens',
		title: 'List Tokens',
		description: 'Fetch a list of tokens along with a summary of their market- and metadata.',
		server: 'https://s1.xrplmeta.org',
		path: '/tokens',
		request: {
			query: {
				include_sources: {
					required: false,
					type: 'boolean',
					description: 'Wether to include the metadata sources for each field.',
					default: false
				},
				include_changes: {
					required: false,
					type: 'boolean',
					description: 'Wether to include the metric changes over time.',
					default: false
				},
				sort_by: {
					required: false,
					type: 'string',
					description: 'The metric the returned list of tokens should be sorted by',
					enum: [
						'trustlines',
						'holders',
						'supply',
						'marketcap',
						'[metric]_delta_24h',
						'[metric]_percent_24h',
						'[metric]_delta_7d',
						'[metric]_percent_7d',
					],
					default: 'trustlines',
				},
				trust_levels: {
					required: false,
					type: 'array',
					description: 'Only return tokens having a trust level that is in this list.',
					items: {
						type: 'int'
					},
					default: [0, 1, 2, 3]
				},
				limit: {
					required: false,
					type: 'number',
					description: 'Limit amount of tokens returned.',
					default: 100,
				},
				offset: {
					name: 'offset',
					required: false,
					type: 'number',
					description: 'Paginate through all tokens available by incrementing the offset.',
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
		description: 'Fetch an individual token along with a summary of its market- and metadata.',
		server: 'https://s1.xrplmeta.org',
		path: '/token/{identifier}',
		request: {
			path: {
				identifier: {
					required: true,
					type: 'string',
					description: 'A string uniquely identifying the token by concatenating the currency code with the issuing address using a colon, for example: "USD:rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B".'
				}
			},
			query: {
				include_sources: {
					required: false,
					type: 'boolean',
					description: 'Wether to include the metadata sources for each field.',
					default: false
				},
				include_changes: {
					required: false,
					type: 'boolean',
					description: 'Wether to include the metric changes over time.',
					default: false
				},
			}
		},
		response: schemas.token
	},
	{
		id: 'get-series',
		title: 'Get Token Series',
		description: 'Get a series of data points representing historical market or ledger data for a specific token. Either specify the time range or the sequence range. Not both.',
		server: 'https://s1.xrplmeta.org',
		path: '/token/{identifier}/series/{metric}',
		request: {
			path: {
				identifier: {
					required: true,
					type: 'string',
					description: 'A string uniquely identifying the token by concatenating the currency code with the issuing address using a colon, for example: "USD:rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B".'
				},
				metric: {
					required: true,
					type: 'string',
					description: 'The type of metric you want to fetch.',
					enum: ['price', 'volume', 'trustlines', 'holders', 'marketcap', 'supply']
				}
			},
			query: {
				time_start: {
					type: 'int',
					description: 'A unix timestamp specifying the first data point. Negative values are interpreted as time back from now.'
				},
				time_end: {
					type: 'int',
					description: 'A unix timestamp specifying the last data point. Negative values are interpreted as time back from now.'
				},
				time_interval: {
					type: 'int',
					required: true,
					description: 'The time interval between data points in seconds.'
				},
				sequence_start: {
					type: 'int',
					description: 'The ledger sequence specifying the first data point. Negative values are interpreted as ledgers back from current.'
				},
				sequence_end: {
					type: 'int',
					description: 'The ledger sequence specifying the last data point. Negative values are interpreted as ledgers back from current.'
				},
				sequence_interval: {
					type: 'int',
					required: true,
					description: 'The ledger interval between data points.'
				}
			}
		},
		response: {
			type: 'array',
			items: schemas.seriesPoint
		}
	}
]


export const websocket = [
	{
		id: 'server-info',
		title: 'Server Info',
		description: 'Fetch generic information about the server.',
		server: 'wss://s1.xrplmeta.org',
		command: 'server_info',
		request: {},
		response: schemas.serverInfo
	},
	{
		id: 'ledger-lookup',
		title: 'Ledger Lookup',
		description: 'Fetch metadata about a specific ledger.',
		server: 'wss://s1.xrplmeta.org',
		command: 'ledger',
		request: {
			sequence: {
				required: false,
				type: 'int',
				description: 'The ledger sequence of the ledger. Optional if time is specified.',
			},
			time: {
				required: false,
				type: 'int',
				description: 'The unix timestamp of the ledger. Optional if sequence is specified.',
			},
			strict: {
				required: false,
				type: 'boolean',
				description: 'If set to true, either the sequence or time parameter has to be an exact match.',
				default: false
			},
		},
		response: schemas.ledger
	},
	{
		id: 'list-tokens',
		title: 'List Tokens',
		description: 'Fetch a list of tokens along with a summary of their market- and metadata.',
		server: 'wss://s1.xrplmeta.org',
		command: 'tokens',
		request: {
			include_sources: {
				required: false,
				type: 'boolean',
				description: 'Wether to include the metadata sources for each field.',
				default: false
			},
			include_changes: {
				required: false,
				type: 'boolean',
				description: 'Wether to include the metric changes over time.',
				default: false
			},
			sort_by: {
				required: false,
				type: 'string',
				description: 'The metric the returned list of tokens should be sorted by',
				enum: [
					'trustlines',
					'holders',
					'supply',
					'marketcap',
					'[metric]_delta_24h',
					'[metric]_percent_24h',
					'[metric]_delta_7d',
					'[metric]_percent_7d',
				],
				default: 'trustlines',
			},
			trust_levels: {
				required: false,
				type: 'array',
				description: 'Only return tokens having a trust level that is in this list.',
				items: {
					type: 'int'
				},
				default: [0, 1, 2, 3]
			},
			limit: {
				required: false,
				type: 'number',
				description: 'Limit amount of tokens returned.',
				default: 100,
			},
			offset: {
				name: 'offset',
				required: false,
				type: 'number',
				description: 'Paginate through all tokens available by incrementing the offset.',
				default: 0,
			}
		},
		response: {
			type: 'array',
			items: schemas.token
		}
	},
	{
		id: 'subscribe-to-tokens',
		title: 'Subscribe to Token Updates',
		description: 'Sends notifications for each specified token along with the new data to the client in realtime. The server forgets about the client\'s subscription list once it disconnects.',
		server: 'wss://s1.xrplmeta.org',
		command: 'tokens_subscribe',
		request: {
			tokens: {
				type: 'array',
				description: 'The list of tokens to subscribe to.',
				items: schemas.basicToken
			},
			include_sources: {
				required: false,
				type: 'boolean',
				description: 'Wether to include the metadata sources for each field.',
				default: false
			},
			include_changes: {
				required: false,
				type: 'boolean',
				description: 'Wether to include the metric changes over time.',
				default: false
			}
		},
		response: {
			type: 'object',
			properties: {
				subscriptions: {
					type: 'object',
					description: 'The current list of token subscriptions that are active.',
					properties: {
						token: schemas.basicToken,
						include_sources: {
							type: 'boolean',
							description: 'Wether metadata sources are included for updates on this token.',
						},
						include_changes: {
							type: 'boolean',
							description: 'Wether metric changes are included for updates on this token.',
						}
					}
				}
			}
		}
	},
	{
		id: 'unsubscribe-from-tokens',
		title: 'Unsubscribe from Token Updates',
		description: 'Clears any previously set subscriptions to the specified tokens.',
		server: 'wss://s1.xrplmeta.org',
		command: 'tokens_unsubscribe',
		request: {
			tokens: {
				type: 'array',
				description: 'The list of tokens to unsubscribe from.',
				items: schemas.basicToken
			}
		},
		response: {
			type: 'object',
			properties: {
				subscriptions: {
					type: 'object',
					description: 'The list of token subscriptions that are still active after unsubscribing.',
					properties: {
						token: schemas.basicToken,
						include_sources: {
							type: 'boolean',
							description: 'Wether metadata sources are included for updates on this token.',
						},
						include_changes: {
							type: 'boolean',
							description: 'Wether metric changes are included for updates on this token.',
						}
					}
				}
			}
		}
	},
	{
		id: 'get-token',
		title: 'Get Token',
		description: 'Fetch an individual token along with a summary of its market- and metadata.',
		server: 'wss://s1.xrplmeta.org',
		command: 'token',
		request: {
			token: {
				required: true,
				type: 'object',
				description: 'An object identifying the token.',
				properties: {
					currency: {
						type: 'string',
						description: 'The currency code of the token. Can be HEX or UTF-8.'
					},
					issuer: {
						type: 'string',
						description: 'The issuing address of the token.'
					}
				}
			},
			include_sources: {
				required: false,
				type: 'boolean',
				description: 'Wether to include the metadata sources for each field.',
				default: false
			},
			include_changes: {
				required: false,
				type: 'boolean',
				description: 'Wether to include the metric changes over time.',
				default: false
			},
		},
		response: schemas.token
	},
	{
		id: 'get-series',
		title: 'Get Token Series',
		description: 'Get a series of data points representing historical market or ledger data for a specific token.',
		server: 'wss://s1.xrplmeta.org',
		command: 'token_series',
		request: {
			token: {
				required: true,
				type: 'object',
				description: 'An object identifying the token.',
				properties: schemas.basicToken.properties
			},
			metric: {
				required: true,
				type: 'string',
				description: 'The type of metric you want to fetch.',
				enum: ['price', 'volume', 'trustlines', 'holders', 'marketcap', 'supply']
			},
			time: {
				type: 'object',
				description: 'Define a time range to get a time based series.',
				properties: {
					start: {
						type: 'int',
						description: 'A unix timestamp specifying the first data point. Negative values are interpreted as time back from now.'
					},
					end: {
						type: 'int',
						description: 'A unix timestamp specifying the last data point. Negative values are interpreted as time back from now.'
					},
					interval: {
						type: 'int',
						required: true,
						description: 'The time interval between data points in seconds.'
					}
				}
			},
			sequence: {
				type: 'object',
				description: 'Define a ledger sequence range to get a ledger sequence based series.',
				properties: {
					start: {
						type: 'int',
						description: 'The ledger sequence specifying the first data point. Negative values are interpreted as ledgers back from current.'
					},
					end: {
						type: 'int',
						description: 'The ledger sequence specifying the last data point. Negative values are interpreted as ledgers back from current.'
					},
					interval: {
						type: 'int',
						required: true,
						description: 'The ledger interval between data points.'
					}
				}
			}
		},
		response: {
			type: 'array',
			items: schemas.seriesPoint
		}
	}
]