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
            int totalEmployees = await Task.Run(() => _context.Employees.Count());
            int totalOnLeave = await Task.Run(() => _context.Employees.Where(x => x.Status == EmployeeStatus.OnLeave).Count());
            int thirtyDayHires = await Task.Run(() => _context.Employees.Where(x => x.DateOfHire >= DateTime.Now.AddDays(-30)).Count());
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
    }
}
