# Deploying to Render

This guide explains how to deploy the Tic-Tac-Toe application to Render platform.

## Prerequisites

- A Render account (https://render.com)
- Your code pushed to a GitHub repository

## Deployment Steps

Since this is a full-stack application, you'll need to create two separate services on Render:

### 1. Deploy Backend Service

1. Go to your Render dashboard
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name:** tic-tac-toe-backend
   - **Environment:** Docker
   - **Dockerfile Path:** `Dockerfile.backend`
   - **Docker Build Context Directory:** `.` (root directory)
   - **Port:** 3001

5. Add Environment Variables:
   - `NODE_ENV`: production
   - `PORT`: 3001

6. Click "Create Web Service"

### 2. Deploy Frontend Service

1. Go to your Render dashboard
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name:** tic-tac-toe-frontend
   - **Environment:** Docker
   - **Dockerfile Path:** `Dockerfile.frontend`
   - **Docker Build Context Directory:** `.` (root directory)
   - **Port:** 80

5. Add Environment Variables:
   - `REACT_APP_API_URL`: https://[your-backend-service-name].onrender.com/api
   
   ⚠️ **Important:** Replace `[your-backend-service-name]` with the actual URL of your deployed backend service

6. Click "Create Web Service"

### 3. Update Frontend API Configuration

After both services are deployed, you need to update the frontend to point to your backend URL:

1. Update the `REACT_APP_API_URL` environment variable in your frontend service to point to your backend service URL
2. The frontend will automatically redeploy with the new configuration

## Alternative: Using Root Dockerfiles

If you prefer to use the Dockerfiles in the subdirectories, you can:

### For Backend:
- **Dockerfile Path:** `backend/Dockerfile`
- **Docker Build Context Directory:** `backend`

### For Frontend:
- **Dockerfile Path:** `frontend/Dockerfile`
- **Docker Build Context Directory:** `frontend`

## Troubleshooting

### "failed to read dockerfile: read /home/user/.local/tmp/buildkit-mount591085182/src: is a directory"

This error occurs when the Dockerfile path is incorrect. Make sure:
- You're using `Dockerfile.backend` or `Dockerfile.frontend` (not just the directory name)
- The Docker Build Context Directory is set to `.` (root) when using root-level Dockerfiles

### CORS Issues

If you encounter CORS issues:
1. Ensure your backend service has CORS properly configured
2. Update the frontend's API URL environment variable to match your backend service URL

### Build Failures

If the build fails due to missing package-lock.json:
- The root-level Dockerfiles use `npm install` instead of `npm ci` to handle this
- Make sure your package.json files are properly committed

## Local Testing

Before deploying, test the configuration locally:

```bash
# Test backend build
docker build -f Dockerfile.backend -t tic-tac-toe-backend .

# Test frontend build
docker build -f Dockerfile.frontend -t tic-tac-toe-frontend .

# Or use docker-compose
docker-compose up --build
```

## Post-Deployment Steps

1. Test the backend API endpoints directly
2. Verify the frontend can communicate with the backend
3. Check the application logs in Render dashboard for any errors
4. Set up health checks for both services

## Security Considerations

1. Use HTTPS for all communications
2. Set appropriate CORS origins in production
3. Use environment variables for sensitive configuration
4. Enable Render's DDoS protection if available