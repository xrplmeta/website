export const schemas = {
	basicToken: {
		type: 'object',
		description: 'A token identifier. Specify either currency and issuer for IOUs, mptIssuanceId for MPTs, or currency \"XRP\" where XRP is allowed.',
		properties: {
			currency: {
				type: 'string',
				description: 'The currency code of an IOU token. Can be HEX or UTF-8. Use \"XRP\" to identify XRP where allowed.'
			},
			issuer: {
				type: 'string',
				description: 'The issuing address of an IOU token.'
			},
			mptIssuanceId: {
				type: 'string',
				description: 'The MPT issuance ID of a multi-purpose token.'
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
				description: 'Currency code of the token. Can be HEX or UTF-8. Present for IOU tokens.'
			},
			issuer: {
				type: 'string',
				description: 'Issuing address of the token. Present for IOU tokens.'
			},
			mpt_issuance_id: {
				type: 'string',
				description: 'MPT issuance ID. Present for MPT tokens.'
			},
			token_type: {
				type: 'string',
				description: 'The token type.',
				enum: ['iou', 'mpt']
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
							asset_class: {
								type: 'string',
								description: 'The class of the underlying asset this token (IOU) represents.',
								enum: [
									'fiat',
									'commodity',
									'equity',
									'cryptocurrency'
								]
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
					volume_24h: {
						type: 'string',
						description: 'The aggregated trading volume of the last 24 hours in XRP represented as decimal string.'
					},
					volume_7d: {
						type: 'string',
						description: 'The aggregated trading volume of the last 7 days in XRP represented as decimal string.'
					},
					exchanges_24h: {
						type: 'int',
						description: 'The number of trades that occured in the last 24 hours.'
					},
					exchanges_7d: {
						type: 'int',
						description: 'The number of trades that occured in the last 7 days.'
					},
					takers_24h: {
						type: 'int',
						description: 'The number of unique offer book taker accounts in the last 24 hours.'
					},
					takers_7d: {
						type: 'int',
						description: 'The number of unique offer book taker accounts in the last 7 days.'
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
	tokenListResponse: {
		type: 'object',
		properties: {
			tokens: {
				type: 'array',
				items: null,
				description: 'The list of tokens.'
			},
			count: {
				type: 'integer',
				description: 'The total number of tokens that meet the query criteria.'
			}
		}
	},
	tokenExchangesResponse: {
		type: 'object',
		properties: {
			exchanges: {
				type: 'array',
				description: 'The matching token exchanges.',
				items: {
					type: 'object',
					properties: {
						txHash: {
							type: 'string',
							description: 'The transaction hash.'
						},
						ledgerSequence: {
							type: 'int',
							description: 'The ledger sequence containing the exchange.'
						},
						taker: {
							type: 'string',
							description: 'The account that took the offer.'
						},
						maker: {
							type: 'string',
							description: 'The account that created the offer.'
						},
						price: {
							type: 'string',
							description: 'The exchange price represented as decimal string.'
						},
						volume: {
							type: 'string',
							description: 'The exchanged volume represented as decimal string.'
						}
					}
				}
			},
			marker: {
				type: 'null',
				description: 'Pagination marker. Currently always null.'
			}
		}
	},
	tokenHoldersResponse: {
		type: 'object',
		properties: {
			totalSupply: {
				type: 'string',
				description: 'The total token supply at the ledger point.'
			},
			totalHolders: {
				type: 'int',
				description: 'The total number of token holders at the ledger point.'
			},
			holders: {
				type: 'array',
				description: 'The token holders page.',
				items: {
					type: 'object',
					properties: {
						account: {
							type: 'string',
							description: 'The holder account address.'
						},
						balance: {
							type: 'string',
							description: 'The account balance represented as decimal string.'
						},
						percent: {
							type: 'number',
							description: 'The account balance as percentage of total supply.'
						}
					}
				}
			},
			ledgerSequence: {
				type: 'int',
				description: 'The ledger sequence used for this lookup.'
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

schemas.tokenListResponse.properties.tokens.items = schemas.token

const tokenQuery = {
	name_like: {
		required: false,
		type: 'string',
		description: 'A search term to filter the list of tokens by.'
	},
	expand_meta: {
		required: false,
		type: 'boolean',
		description: 'Wether to return the full set of metadata including sources.',
		default: false
	},
	include_sources: {
		required: false,
		type: 'boolean',
		description: 'Wether to include the metadata sources for each field. Alias for expand_meta.',
		default: false
	},
	include_changes: {
		required: false,
		type: 'boolean',
		description: 'Wether to include the metric changes over time.',
		default: false
	},
	decode_currency: {
		required: false,
		type: 'boolean',
		description: 'Wether to return IOU currency codes as UTF-8 instead of HEX when possible.',
		default: false
	},
	original_icons: {
		required: false,
		type: 'boolean',
		description: 'Wether to return original icon URLs instead of cached XRPL Meta icon URLs.',
		default: false
	},
	prefer_sources: {
		required: false,
		type: 'array',
		description: 'A list of metadata sources to prefer when resolving conflicting metadata fields.',
		items: {
			type: 'string'
		}
	},
	sort_by: {
		required: false,
		type: 'string',
		description: 'The metric the returned list of tokens should be sorted by.',
		enum: [
			'holders',
			'supply',
			'marketcap',
			'price_percent_24h',
			'price_percent_7d',
			'volume_24h',
			'volume_7d',
			'exchanges_24h',
			'exchanges_7d',
			'takers_24h',
			'takers_7d',
			'[metric]_delta_24h',
			'[metric]_percent_24h',
			'[metric]_delta_7d',
			'[metric]_percent_7d',
		],
		default: 'holders',
	},
	trust_level: {
		required: false,
		type: 'array',
		description: 'Only return tokens having a trust level that is in this list. REST accepts a comma-separated list.',
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

const iouTokenQuery = {
	...tokenQuery,
	sort_by: {
		...tokenQuery.sort_by,
		enum: ['trustlines', ...tokenQuery.sort_by.enum],
		default: 'trustlines'
	}
}

const tokenOptionsQuery = {
	expand_meta: tokenQuery.expand_meta,
	include_sources: tokenQuery.include_sources,
	include_changes: tokenQuery.include_changes,
	decode_currency: tokenQuery.decode_currency,
	original_icons: tokenQuery.original_icons,
	prefer_sources: tokenQuery.prefer_sources
}

const rangeQuery = {
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
		description: 'The time interval between data points in seconds. Required for series endpoints when using time ranges.'
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
		description: 'The ledger interval between data points. Required for series endpoints when using ledger sequence ranges.'
	}
}

const pointQuery = {
	sequence: {
		required: false,
		type: 'int',
		description: 'The ledger sequence. Optional if time is specified.',
	},
	time: {
		required: false,
		type: 'int',
		description: 'The unix timestamp. Optional if sequence is specified.',
	}
}

const seriesMetric = {
	required: true,
	type: 'string',
	description: 'The type of metric you want to fetch. The trustlines metric is only available for IOU tokens.',
	enum: ['price', 'trustlines', 'holders', 'marketcap', 'supply']
}

export const rest = [
	{
		id: 'server-info',
		title: 'Server Info',
		description: 'Fetch generic information about the server.',
		server: 'https://s1.xrplmeta.org',
		path: '/v2/server',
		request: {},
		response: schemas.serverInfo
	},
	{
		id: 'ledger-lookup',
		title: 'Ledger Lookup',
		description: 'Fetch metadata about a specific ledger.',
		server: 'https://s1.xrplmeta.org',
		path: '/v2/ledger',
		request: {
			query: pointQuery
		},
		response: schemas.ledger
	},
	{
		id: 'list-tokens',
		title: 'List Tokens',
		description: 'Fetch a list of IOU and MPT tokens along with a summary of their market- and metadata.',
		server: 'https://s1.xrplmeta.org',
		path: '/v2/tokens',
		request: {
			query: tokenQuery
		},
		response: schemas.tokenListResponse
	},
	{
		id: 'list-ious',
		title: 'List IOU Tokens',
		description: 'Fetch a list of issued currency tokens along with a summary of their market- and metadata.',
		server: 'https://s1.xrplmeta.org',
		path: '/v2/tokens/iou',
		request: {
			query: iouTokenQuery
		},
		response: schemas.tokenListResponse
	},
	{
		id: 'list-mpts',
		title: 'List MPT Tokens',
		description: 'Fetch a list of multi-purpose tokens along with a summary of their market- and metadata.',
		server: 'https://s1.xrplmeta.org',
		path: '/v2/tokens/mpt',
		request: {
			query: tokenQuery
		},
		response: schemas.tokenListResponse
	},
	{
		id: 'get-token',
		title: 'Get Token',
		description: 'Fetch an individual IOU or MPT token along with a summary of its market- and metadata.',
		server: 'https://s1.xrplmeta.org',
		path: '/v2/token/{identifier}',
		request: {
			path: {
				identifier: {
					required: true,
					type: 'string',
					description: 'An IOU identifier formatted as "currency:issuer", for example "USD:rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B", or an MPT issuance ID.'
				}
			},
			query: tokenOptionsQuery
		},
		response: schemas.token
	},
	{
		id: 'get-series',
		title: 'Get Token Series',
		description: 'Get a series of data points representing historical market or ledger data for a specific IOU or MPT token. Either specify the time range or the sequence range. Not both.',
		server: 'https://s1.xrplmeta.org',
		path: '/v2/token/{identifier}/series/{metric}',
		request: {
			path: {
				identifier: {
					required: true,
					type: 'string',
					description: 'An IOU identifier formatted as "currency:issuer", for example "USD:rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B", or an MPT issuance ID.'
				},
				metric: seriesMetric
			},
			query: rangeQuery
		},
		response: {
			type: 'array',
			items: schemas.seriesPoint
		}
	},
	{
		id: 'get-exchanges',
		title: 'Get Token Exchanges',
		description: 'Fetch historical exchanges between two assets. Assets can be XRP, IOU identifiers, or MPT issuance IDs.',
		server: 'https://s1.xrplmeta.org',
		path: '/v2/tokens/exchanges/{base}/{quote}',
		request: {
			path: {
				base: {
					required: true,
					type: 'string',
					description: 'The base asset: XRP, an IOU identifier formatted as "currency:issuer", or an MPT issuance ID.'
				},
				quote: {
					required: true,
					type: 'string',
					description: 'The quote asset: XRP, an IOU identifier formatted as "currency:issuer", or an MPT issuance ID.'
				}
			},
			query: {
				...rangeQuery,
				newest_first: {
					required: false,
					type: 'boolean',
					description: 'Wether to sort the newest exchanges first.',
					default: false
				},
				limit: tokenQuery.limit,
				offset: tokenQuery.offset
			}
		},
		response: schemas.tokenExchangesResponse
	},
	{
		id: 'get-holders',
		title: 'Get Token Holders',
		description: 'Fetch token holders at a specific ledger point. Defaults to the most recent ledger if neither sequence nor time is specified.',
		server: 'https://s1.xrplmeta.org',
		path: '/v2/token/{identifier}/holders',
		request: {
			path: {
				identifier: {
					required: true,
					type: 'string',
					description: 'An IOU identifier formatted as "currency:issuer", for example "USD:rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B", or an MPT issuance ID.'
				}
			},
			query: {
				...pointQuery,
				limit: tokenQuery.limit,
				offset: tokenQuery.offset
			}
		},
		response: schemas.tokenHoldersResponse
	}
]


export const websocket = [
	{
		id: 'server-info',
		title: 'Server Info',
		description: 'Fetch generic information about the server.',
		server: 'wss://s1.xrplmeta.org',
		command: 'server_info',
		api_version: 2,
		request: {},
		response: schemas.serverInfo
	},
	{
		id: 'ledger-lookup',
		title: 'Ledger Lookup',
		description: 'Fetch metadata about a specific ledger.',
		server: 'wss://s1.xrplmeta.org',
		command: 'ledger',
		api_version: 2,
		request: pointQuery,
		response: schemas.ledger
	},
	{
		id: 'list-tokens',
		title: 'List Tokens',
		description: 'Fetch a list of IOU and MPT tokens along with a summary of their market- and metadata.',
		server: 'wss://s1.xrplmeta.org',
		command: 'tokens',
		api_version: 2,
		request: tokenQuery,
		response: schemas.tokenListResponse
	},
	{
		id: 'list-ious',
		title: 'List IOU Tokens',
		description: 'Fetch a list of issued currency tokens along with a summary of their market- and metadata.',
		server: 'wss://s1.xrplmeta.org',
		command: 'iou_tokens',
		api_version: 2,
		request: iouTokenQuery,
		response: schemas.tokenListResponse
	},
	{
		id: 'list-mpts',
		title: 'List MPT Tokens',
		description: 'Fetch a list of multi-purpose tokens along with a summary of their market- and metadata.',
		server: 'wss://s1.xrplmeta.org',
		command: 'mpt_tokens',
		api_version: 2,
		request: tokenQuery,
		response: schemas.tokenListResponse
	},
	{
		id: 'get-token',
		title: 'Get Token',
		description: 'Fetch an individual IOU or MPT token along with a summary of its market- and metadata.',
		server: 'wss://s1.xrplmeta.org',
		command: 'token',
		api_version: 2,
		request: {
			token: {
				required: true,
				type: 'object',
				description: 'An object identifying an IOU by currency and issuer, or an MPT by mptIssuanceId.',
				properties: schemas.basicToken.properties
			},
			...tokenOptionsQuery
		},
		response: schemas.token
	},
	{
		id: 'get-series',
		title: 'Get Token Series',
		description: 'Get a series of data points representing historical market or ledger data for a specific IOU or MPT token.',
		server: 'wss://s1.xrplmeta.org',
		command: 'token_series',
		api_version: 2,
		request: {
			token: {
				required: true,
				type: 'object',
				description: 'An object identifying an IOU by currency and issuer, or an MPT by mptIssuanceId.',
				properties: schemas.basicToken.properties
			},
			metric: seriesMetric,
			time: {
				type: 'object',
				description: 'Define a time range to get a time based series.',
				properties: {
					start: rangeQuery.time_start,
					end: rangeQuery.time_end,
					interval: {
						...rangeQuery.time_interval,
						required: true
					}
				}
			},
			sequence: {
				type: 'object',
				description: 'Define a ledger sequence range to get a ledger sequence based series.',
				properties: {
					start: rangeQuery.sequence_start,
					end: rangeQuery.sequence_end,
					interval: {
						...rangeQuery.sequence_interval,
						required: true
					}
				}
			}
		},
		response: {
			type: 'array',
			items: schemas.seriesPoint
		}
	},
	{
		id: 'get-exchanges',
		title: 'Get Token Exchanges',
		description: 'Fetch historical exchanges between two assets. Assets can be XRP, IOU identifiers, or MPT identifiers.',
		server: 'wss://s1.xrplmeta.org',
		command: 'token_exchanges',
		api_version: 2,
		request: {
			base: {
				required: true,
				type: 'object',
				description: 'The base asset. Use { currency: "XRP" } for XRP, currency and issuer for IOUs, or mptIssuanceId for MPTs.',
				properties: schemas.basicToken.properties
			},
			quote: {
				required: true,
				type: 'object',
				description: 'The quote asset. Use { currency: "XRP" } for XRP, currency and issuer for IOUs, or mptIssuanceId for MPTs.',
				properties: schemas.basicToken.properties
			},
			sequence: {
				type: 'object',
				description: 'Optional ledger sequence range. Defaults to the full available range if neither sequence nor time is specified.',
				properties: {
					start: rangeQuery.sequence_start,
					end: rangeQuery.sequence_end
				}
			},
			time: {
				type: 'object',
				description: 'Optional time range. Defaults to the full available range if neither sequence nor time is specified.',
				properties: {
					start: rangeQuery.time_start,
					end: rangeQuery.time_end
				}
			},
			newestFirst: {
				required: false,
				type: 'boolean',
				description: 'Wether to sort the newest exchanges first.',
				default: false
			},
			limit: {
				...tokenQuery.limit,
				default: 100
			},
			offset: tokenQuery.offset
		},
		response: schemas.tokenExchangesResponse
	},
	{
		id: 'get-holders',
		title: 'Get Token Holders',
		description: 'Fetch token holders at a specific ledger point. Defaults to the most recent ledger if neither sequence nor time is specified.',
		server: 'wss://s1.xrplmeta.org',
		command: 'token_holders',
		api_version: 2,
		request: {
			token: {
				required: true,
				type: 'object',
				description: 'An object identifying an IOU by currency and issuer, or an MPT by mptIssuanceId.',
				properties: schemas.basicToken.properties
			},
			...pointQuery,
			limit: tokenQuery.limit,
			offset: tokenQuery.offset
		},
		response: schemas.tokenHoldersResponse
	}
]
