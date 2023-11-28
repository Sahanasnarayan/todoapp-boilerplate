import APIService from './api.service';

export default class AccessService extends APIService {
  login(username: string, password: string): Promise<any> {
    return this.apiClient.post('/access-tokens', {
      username,
      password,
    });
  }
  register(name: string, username: string, password: string): Promise<any> {
    return this.apiClient.post('/accounts/register', {
      name, 
      username, 
      password
    });
  }
  //task CRUD operation
  add(userId, token, title, description): Promise<any> {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
    return this.apiClient.post(`/${userId}/tasks/add`, {
      title,
      description,
    }, config);
  }

  getAll(userId, token): Promise<any> {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
    return this.apiClient.get(`/${userId}/tasks/getAll`, config);
  }

  delete(userId, token, taskId): Promise<any> {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
    return this.apiClient.delete(`/${userId}/tasks/delete/${taskId}`, config);
  }

  update(userId, token, taskId, title,  description, isComplete): Promise<any> {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
    return this.apiClient.put(`/${userId}/tasks/update/${taskId}`, {
      title,
      description,
      isComplete,
    }, config);
  }
}
