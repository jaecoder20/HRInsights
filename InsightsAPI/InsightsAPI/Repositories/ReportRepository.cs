using InsightsAPI.Data;
using InsightsAPI.Entities;

namespace InsightsAPI.Repositories
{
    public class ReportRepository : IReportRepository
    {
        private readonly DataContext _context;
        public ReportRepository(DataContext dataContext)
        {
            _context = dataContext;
        }
        public async Task<Report> GetReportsAsync()
        {
            try
            {
                // Get the total number of employees
                int totalEmployees = await Task.Run(() => _context.Employees.Count());
                // Get the total number of employees on leave
                int totalOnLeave = await Task.Run(() => _context.Employees.Where(x => x.Status == EmployeeStatus.OnLeave).Count());
                // Get the total number of employees hired in the last 30 days
                int thirtyDayHires = await Task.Run(() => _context.Employees.Where(x => x.DateOfHire >= DateTime.Now.AddDays(-30)).Count());
                // Get the total number of active employees
                int totalActive = await Task.Run(() => _context.Employees.Where(x => x.Status == EmployeeStatus.Active).Count());
                Report report = new Report
                {
                    TotalActive = totalActive,
                    TotalEmployees = totalEmployees,
                    TotalOnLeave = totalOnLeave,
                    ThirtyDayHires = thirtyDayHires
                };

                return report;
            }
            catch (Exception ex)
            {
                // return null; regardless of the exception that occurs, returning null means failure
                return null;
            }
        }
    }
}
