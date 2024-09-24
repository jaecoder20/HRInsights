using InsightsAPI.Entities;

namespace InsightsAPI.Repositories
{
    public interface IReportRepository
    {
        Task<Report> GetReportsAsync();
    }
}
