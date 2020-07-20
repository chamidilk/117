## 117 Emergency Request Management System for the Disaster Management Center of Sri Lanka

117 is a stand-alone system develpoed and deployed on behalf of the DMC in Sri Lanka after the disastrous floods of 2016. This system is primarily used to receive and track resource requests at the DMC.

![Architecture Diagram](https://github.com/ramdesh/117/blob/master/dmc_117.png?raw=true)

### Backend

The backend is developed using the [PHP Slim Framework](http://www.slimframework.com/). 
To install dependencies, use [Compose](https://getcomposer.org/doc/01-basic-usage.md#:~:text=Installing%20with%20composer.,-lock%20%23&text=lock%20file%20as%20well%20as,project%20(which%20is%20good).)
To host the backend, you need to use a PHP-enabled server such as Apache or Nginx.

### DB

The 117 app uses MySQL (~8). Scripts for setting up the database can be found in `db/117.sql` and `db/117Support.sql`.

### UI

The UI is developed in AngularJS (<2). Install dependencies using `npm install`. 

### Deployment

The app is deployed to a Linux server managed by SLT. Credentials should be obtained from the DMC. 

