INSERT INTO [HRInsightsDatabase].[dbo].[Employees]
  ([EmployeeId], [FirstName], [LastName], [Email], [PhoneNumber], [Position], [DateOfHire], [Salary], [Status], [Role], [PhotoUrl])
VALUES
  ('EMP001', 'John', 'Doe', 'johndoe@example.com', '555-123-4567', 'Software Engineer', '2020-01-15', 75000.00, 1, 'Employee', '../../public/uploads/man1.jpg');

INSERT INTO [HRInsightsDatabase].[dbo].[Employees]
  ([EmployeeId], [FirstName], [LastName], [Email], [PhoneNumber], [Position], [DateOfHire], [Salary], [Status], [Role], [PhotoUrl])
VALUES
  ('EMP002', 'Jane', 'Smith', 'janesmith@example.com', '555-234-5678', 'Project Manager', '2019-05-20', 85000.00, 1, 'HR Administrator', '../../public/uploads/woman1.jpg');

INSERT INTO [HRInsightsDatabase].[dbo].[Employees]
  ([EmployeeId], [FirstName], [LastName], [Email], [PhoneNumber], [Position], [DateOfHire], [Salary], [Status], [Role], [PhotoUrl])
VALUES
  ('EMP003', 'Michael', 'Johnson', 'mjohnson@example.com', '555-345-6789', 'Data Analyst', '2021-07-10', 68000.00, 1, 'Employee', '../../public/uploads/man2.jpg');

INSERT INTO [HRInsightsDatabase].[dbo].[Employees]
  ([EmployeeId], [FirstName], [LastName], [Email], [PhoneNumber], [Position], [DateOfHire], [Salary], [Status], [Role], [PhotoUrl])
VALUES
  ('EMP004', 'Emily', 'Davis', 'edavis@example.com', '555-456-7890', 'HR Specialist', '2018-11-25', 72000.00, 1, 'HR Administrator', '../../public/uploads/woman2.jpg');

INSERT INTO [HRInsightsDatabase].[dbo].[Employees]
  ([EmployeeId], [FirstName], [LastName], [Email], [PhoneNumber], [Position], [DateOfHire], [Salary], [Status], [Role], [PhotoUrl])
VALUES
  ('EMP005', 'David', 'Wilson', 'dwilson@example.com', '555-567-8901', 'DevOps Engineer', '2022-03-15', 94000.00, 1, 'Employee', '../../public/uploads/man3.jpg');

INSERT INTO [HRInsightsDatabase].[dbo].[Employees]
  ([EmployeeId], [FirstName], [LastName], [Email], [PhoneNumber], [Position], [DateOfHire], [Salary], [Status], [Role], [PhotoUrl])
VALUES
  ('EMP006', 'Sophia', 'Brown', 'sbrown@example.com', '555-678-9012', 'Marketing Specialist', '2020-06-05', 65000.00, 1, 'Employee', '../../public/uploads/woman3.jpg');

INSERT INTO [HRInsightsDatabase].[dbo].[Employees]
  ([EmployeeId], [FirstName], [LastName], [Email], [PhoneNumber], [Position], [DateOfHire], [Salary], [Status], [Role], [PhotoUrl])
VALUES
  ('EMP007', 'James', 'Miller', 'jmiller@example.com', '555-789-0123', 'IT Support Specialist', '2017-09-12', 58000.00, 1, 'Employee', '../../public/uploads/man4.jpg');

INSERT INTO [HRInsightsDatabase].[dbo].[Employees]
  ([EmployeeId], [FirstName], [LastName], [Email], [PhoneNumber], [Position], [DateOfHire], [Salary], [Status], [Role], [PhotoUrl])
VALUES
  ('EMP008', 'Isabella', 'Taylor', 'itaylor@example.com', '555-890-1234', 'Product Manager', '2021-01-22', 88000.00, 1, 'HR Administrator', '../../public/uploads/woman4.jpg');

INSERT INTO [HRInsightsDatabase].[dbo].[Employees]
  ([EmployeeId], [FirstName], [LastName], [Email], [PhoneNumber], [Position], [DateOfHire], [Salary], [Status], [Role], [PhotoUrl])
VALUES
  ('EMP009', 'Robert', 'Anderson', 'randerson@example.com', '555-901-2345', 'Backend Developer', '2022-08-18', 81000.00, 1, 'Employee', '../../public/uploads/man5.jpg');

INSERT INTO [HRInsightsDatabase].[dbo].[Employees]
  ([EmployeeId], [FirstName], [LastName], [Email], [PhoneNumber], [Position], [DateOfHire], [Salary], [Status], [Role], [PhotoUrl])
VALUES
  ('EMP010', 'Olivia', 'Thomas', 'othomas@example.com', '555-012-3456', 'UI/UX Designer', '2019-10-30', 70000.00, 1, 'Employee', '../../public/uploads/woman5.jpg');
INSERT INTO [HRInsightsDatabase].[dbo].[Users]
  ([Username], [Email], [PasswordHash])
VALUES
  ('johndoe', 'johndoe@example.com', 'hashed_password_1');

INSERT INTO [HRInsightsDatabase].[dbo].[Users]
  ([Username], [Email], [PasswordHash])
VALUES
  ('janesmith', 'janesmith@example.com', 'hashed_password_2');

INSERT INTO [HRInsightsDatabase].[dbo].[Users]
  ([Username], [Email], [PasswordHash])
VALUES
  ('mjohnson', 'mjohnson@example.com', 'hashed_password_3');

INSERT INTO [HRInsightsDatabase].[dbo].[Users]
  ([Username], [Email], [PasswordHash])
VALUES
  ('edavis', 'edavis@example.com', 'hashed_password_4');

INSERT INTO [HRInsightsDatabase].[dbo].[Users]
  ([Username], [Email], [PasswordHash])
VALUES
  ('dwilson', 'dwilson@example.com', 'hashed_password_5');
