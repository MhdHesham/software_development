<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class EmployeeController extends Controller
{
    public function index()
    {
        try {
            $employees = Employee::all();

            return response()->json([
                'status' => true,
                'data' => $employees
            ]);
        } catch (\Exception $e) {
            Log::error($e);
            return response()->json(['status' => false, 'message' => 'Error fetching employees'], 500);
        }
    }

    public function show($id)
    {
        try {
            $employee = Employee::find($id);

            if (!$employee) {
                return response()->json(['status' => false, 'message' => 'Employee not found'], 404);
            }

            return response()->json([
                'status' => true,
                'data' => $employee
            ]);
        } catch (\Exception $e) {
            Log::error($e);
            return response()->json(['status' => false, 'message' => 'Error fetching employee'], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name'      => 'required|string|max:255',
                'email'     => 'required|email|unique:employees,email',
                'phone'     => 'nullable|string|max:20',
                'position'  => 'nullable|string|max:255',
                'salary'    => 'nullable|numeric|min:0',
                'hire_date' => 'nullable|date',
                'image'     => 'nullable|image|mimes:jpg,png,jpeg|max:2048',
            ]);

            if ($request->hasFile('image')) {
                $path = $request->file('image')->store('employees', 'public');
                $validated['image'] = $path;
            }

            $employee = Employee::create($validated);

            return response()->json([
                'status' => true,
                'message' => 'Employee created successfully',
                'data' => $employee
            ], 201);

        } catch (\Exception $e) {
            Log::error($e);
            return response()->json(['status' => false, 'message' => 'Error creating employee'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $employee = Employee::find($id);

            if (!$employee) {
                return response()->json(['status' => false, 'message' => 'Employee not found'], 404);
            }

            $validated = $request->validate([
                'name'      => 'sometimes|required|string|max:255',
                'email'     => 'sometimes|required|email|unique:employees,email,' . $employee->id,
                'phone'     => 'nullable|string|max:20',
                'position'  => 'nullable|string|max:255',
                'salary'    => 'nullable|numeric|min:0',
                'hire_date' => 'nullable|date',
                'image'     => 'nullable|image|mimes:jpg,png,jpeg|max:2048',
            ]);

            if ($request->hasFile('image')) {
                $path = $request->file('image')->store('employees', 'public');
                $validated['image'] = $path;
            }

            $employee->update($validated);

            return response()->json([
                'status' => true,
                'message' => 'Employee updated successfully',
                'data' => $employee
            ]);

        } catch (\Exception $e) {
            Log::error($e);
            return response()->json(['status' => false, 'message' => 'Error updating employee'], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $employee = Employee::find($id);

            if (!$employee) {
                return response()->json(['status' => false, 'message' => 'Employee not found'], 404);
            }

            $employee->delete();

            return response()->json([
                'status' => true,
                'message' => 'Employee deleted successfully'
            ]);

        } catch (\Exception $e) {
            Log::error($e);
            return response()->json(['status' => false, 'message' => 'Error deleting employee'], 500);
        }
    }

    public function search(Request $request)
    {
        try {
            $query = $request->input('query');

            $employees = Employee::where('name', 'like', "%{$query}%")
                ->orWhere('position', 'like', "%{$query}%")
                ->get();

            return response()->json([
                'status' => true,
                'data' => $employees
            ]);

        } catch (\Exception $e) {
            Log::error($e);
            return response()->json(['status' => false, 'message' => 'Error searching employees'], 500);
        }
    }
}
