using InsightsAPI.Entities;
using InsightsAPI.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InsightsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly IReportRepository _reportRepository;
        public ReportController(IReportRepository reportRepository)
        {
            _reportRepository = reportRepository;
        }
        [Authorize(Roles = "HR Administrator, Employee")]
        [HttpGet]
        public async Task<ActionResult<Report>> GetReports()
        {
            var report = await _reportRepository.GetReportsAsync();

            if (report == null)
            {
                return NotFound(new { message = "No reports found." });
            }

            return Ok(new
            {
                message = "Reports retrieved successfully.",
                report = report
            });

        }
    }
}
