import React from 'react';

export default class Server {
  apply(serverHandler) {
    serverHandler.hooks.beforeHtmlRender.tap('AddGoogleAnalytics', (Application) => {
      Application.htmlProps.head.push(
        <script key="addGoogleAnalytics" async src="https://www.google-analytics.com/analytics.js" />,
      );
      return Application;
    });
  }
}
