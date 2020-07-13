from .staff import StaffsApi, StaffApi, StaffPicApi
from .ftp import ListFiles, GetFile, PostFile
from .auth import SignupApi, LoginApi
from .blog import BlogPostsApi, BlogApi
from .pages import PagesApi, PageApi
from .newsletterSignup import NewsletterSignupApi
from .volunteerSignup import VolunteerSignupApi
from .email import SendEmail

def initialize_routes(api):
    api.add_resource(StaffsApi, '/api/staff')
    api.add_resource(StaffApi, '/api/staff/<id>')
    api.add_resource(StaffPicApi, '/api/staff/pic/<id>')

    api.add_resource(PagesApi, '/api/pages')
    api.add_resource(PageApi, '/api/pages/<id>')

    api.add_resource(ListFiles, '/api/files')
    api.add_resource(GetFile, '/api/files/<path:path>')
    api.add_resource(PostFile, '/api/files/<articleId>/<filename>')

    api.add_resource(SignupApi, '/api/auth/signup')
    api.add_resource(LoginApi, '/api/auth/login')

    api.add_resource(NewsletterSignupApi, '/api/newsletter-signup')

    api.add_resource(VolunteerSignupApi, '/api/volunteer-signup')

    api.add_resource(SendEmail, '/api/send-mail')

    api.add_resource(BlogPostsApi, '/api/blog/posts')
    api.add_resource(BlogApi, '/api/blog/<id>')
