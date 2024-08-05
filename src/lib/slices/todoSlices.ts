import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { URL } from "@/constant/config";
import axios from "axios";
import { Priority, TaskTitle } from "@/constant/data";
export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: "To do" | "In Progress" | "Under Review" | "Completed";
  priority: "Low" | "Medium" | "Urgent";
  deadline?: string;
  createdAt: Date;
}

interface TaskState {
  allTodos: Task[];
  fetchStatus: "idle" | "loading" | "succeeded" | "failed";
  createStatus: "idle" | "loading" | "succeeded" | "failed";
  updateStatus: "idle" | "loading" | "succeeded" | "failed";
  deleteStatus: "idle" | "loading" | "succeeded" | "failed";
  fetchError: string | null;
  createError: string | null;
  updateError: string | null;
  deleteError: string | null;
}

const initialState: TaskState = {
  allTodos: [],
  fetchStatus: "idle",
  createStatus: "idle",
  updateStatus: "idle",
  deleteStatus: "idle",
  fetchError: null,
  createError: null,
  updateError: null,
  deleteError: null,
};

interface UpdateTaskPayload {
  id: string;
  status: TaskTitle;
}

export interface CreateTaskPayload {
  title: string;
  description?: string;
  status: TaskTitle;
  priority?: Priority;
  deadline?: string;
}

export const createTask = createAsyncThunk<
  Task,
  CreateTaskPayload,
  { rejectValue: string }
>("todos/createTask", async (newTask, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${URL}/task`, newTask, {
      withCredentials: true,
    });
    return data.message;
  } catch (error) {
    return rejectWithValue("Failed to create task");
  }
});

export const fetchTodos = createAsyncThunk<
  Task[],
  void,
  { rejectValue: string }
>("todos/getAllTodos", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${URL}/task`, { withCredentials: true });

    return data.message;
  } catch (error) {
    return rejectWithValue("Failed to fetch todos");
  }
});

export const deleteTask = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("todos/deleteTask", async (taskId, { rejectWithValue }) => {
  try {
    await axios.delete(`${URL}/task/${taskId}`, {
      withCredentials: true,
    });
    return taskId;
  } catch (error) {
    return rejectWithValue("Failed to delete task");
  }
});
export const UpdateTask = createAsyncThunk<
  Task,
  UpdateTaskPayload,
  { rejectValue: string }
>("todos/updateTask", async ({ id, status }, { rejectWithValue }) => {
  try {
    console.log({ id, status });
    const { data } = await axios.put(
      `${URL}/task/${id}`,
      { status },
      { withCredentials: true }
    );
    return data.message;
  } catch (error) {
    return rejectWithValue("Failed to Update task");
  }
});

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.fetchStatus = "loading";
        state.fetchError = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.allTodos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.fetchError = action.payload ?? "Unknown error occurred";
      })
      .addCase(createTask.pending, (state) => {
        state.createStatus = "loading";
        state.createError = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.allTodos.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.payload ?? "Unknown error occurred";
      })
      .addCase(UpdateTask.pending, (state) => {
        state.updateStatus = "loading";
        state.updateError = null;
      })
      .addCase(UpdateTask.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.allTodos = state.allTodos.map((todo) =>
          todo._id === action.payload._id ? action.payload : todo
        );
      })
      .addCase(UpdateTask.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload ?? "Unknown error occurred";
      })
      .addCase(deleteTask.pending, (state) => {
        state.deleteStatus = "loading";
        state.deleteError = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.allTodos = state.allTodos.filter(
          (todo) => todo._id !== action.payload
        );
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.deleteError = action.payload ?? "Unknown error occurred";
      });
  },
});

export const todoReducer = todoSlice.reducer;
