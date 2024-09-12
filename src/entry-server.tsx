import express from "express";
import React from 'react';
import { type RenderToPipeableStreamOptions, renderToPipeableStream } from 'react-dom/server';
import {
	createStaticHandler,
	createStaticRouter,
	StaticRouterProvider,
} from "react-router-dom/server";

import routes from './routes';

export async function render(
	request: express.Request,
	response: express.Response,
	_url: string, 
	_ssrManifest?: string, 
	options?: RenderToPipeableStreamOptions
) {
	const { query, dataRoutes } = createStaticHandler(routes);
	const remixRequest = createFetchRequest(request, response);
	const context = await query(remixRequest);

	if (context instanceof Response) {
		throw context;
	}

	const staticRouter = createStaticRouter(dataRoutes, context);
	return renderToPipeableStream(
		<React.StrictMode>
			<StaticRouterProvider 
				router={staticRouter}
				context={context}
			/>
		</React.StrictMode>,
		options
	);
};

export function createFetchRequest(
	req: express.Request,
	res: express.Response
): Request {
	let origin = `${req.protocol}://${req.get("host")}`;
	// Note: This had to take originalUrl into account for presumably vite's proxying
	let url = new URL(req.originalUrl || req.url, origin);

	let controller = new AbortController();
	res.on("close", () => controller.abort());
  
	let headers = new Headers();
  
	for (let [key, values] of Object.entries(req.headers)) {
		if (values) {
			if (Array.isArray(values)) {
				for (let value of values) {
					headers.append(key, value);
				}
			}
			else {
				headers.set(key, values);
			}
		}
	}
  
	let init: RequestInit = {
		method: req.method,
		headers,
		signal: controller.signal,
	};

	if (req.method !== "GET" && req.method !== "HEAD") {
		init.body = req.body;
	}

	return new Request(url.href, init);
};